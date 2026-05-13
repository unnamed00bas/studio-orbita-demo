'use client';

import { useCallback, useRef, useState } from 'react';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type Status = 'idle' | 'streaming' | 'error';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus('idle');
    setError(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === 'streaming') return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
      };
      const assistantId = crypto.randomUUID();
      const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '' };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStatus('streaming');
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const data = line.replace(/^data:\s*/, '').trim();
            if (!data) continue;
            try {
              const parsed = JSON.parse(data) as
                | { type: 'delta'; text: string }
                | { type: 'done' }
                | { type: 'error'; message: string };
              if (parsed.type === 'delta') {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + parsed.text }
                      : m
                  )
                );
              } else if (parsed.type === 'error') {
                throw new Error(parsed.message);
              }
            } catch {
              // Skip malformed events.
            }
          }
        }

        setStatus('idle');
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          setStatus('idle');
          return;
        }
        const msg = err instanceof Error ? err.message : 'Unknown error';
        setError(msg);
        setStatus('error');
      } finally {
        abortRef.current = null;
      }
    },
    [messages, status]
  );

  return { messages, status, error, send, reset };
}
