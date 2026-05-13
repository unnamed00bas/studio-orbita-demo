import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@/lib/kb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Role = 'user' | 'assistant';
type ChatMessage = { role: Role; content: string };

const MAX_MESSAGES = 12;
const MAX_LENGTH = 2000;

function validate(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object') return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const out: ChatMessage[] = [];
  for (const m of messages.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;
    if (content.length === 0 || content.length > MAX_LENGTH) return null;
    out.push({ role, content });
  }
  return out;
}

function sseStream(chunks: AsyncIterable<string>): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const text of chunks) {
          const payload = JSON.stringify({ type: 'delta', text });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Stream error';
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', message })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

async function* stubResponse(): AsyncGenerator<string> {
  const reply =
    'Это демо AI-консультанта без подключённого ключа Anthropic. Чтобы я начал отвечать осмысленно: ' +
    'добавьте `ANTHROPIC_API_KEY` в `.env.local` (см. `.env.example`) и перезапустите `npm run dev`. ' +
    'Полный код этого консультанта — в `app/api/chat/route.ts` и `components/chat/`.';
  for (const chunk of reply.match(/.{1,40}/g) ?? []) {
    await new Promise((r) => setTimeout(r, 30));
    yield chunk;
  }
}

async function* anthropicResponse(
  client: Anthropic,
  model: string,
  messages: ChatMessage[]
): AsyncGenerator<string> {
  const stream = client.messages.stream({
    model,
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      yield event.delta.text;
    }
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const messages = validate(body);
  if (!messages) {
    return Response.json(
      { error: 'Bad request: messages must be a non-empty array of {role, content}.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || 'claude-opus-4-7';

  if (!apiKey) {
    return sseStream(stubResponse());
  }

  const client = new Anthropic({ apiKey });
  return sseStream(anthropicResponse(client, model, messages));
}
