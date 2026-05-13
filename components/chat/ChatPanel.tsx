'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from './useChat';

const SUGGESTED = [
  'Какие у вас продукты?',
  'Сколько стоит AI-консультант?',
  'Как запустить контент-завод?',
  'Сколько занимает разработка сайта?',
];

interface Props {
  onClose: () => void;
}

export function ChatPanel({ onClose }: Props) {
  const { messages, status, error, send, reset } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [input]);

  function handleSend(text?: string) {
    const v = (text ?? input).trim();
    if (!v || status === 'streaming') return;
    void send(v);
    setInput('');
  }

  return (
    <div
      role="dialog"
      aria-label="AI-консультант Студии Орбита"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[400px]',
        'h-[min(600px,calc(100vh-7rem))] flex-col overflow-hidden rounded-2xl',
        'border border-border bg-card text-card-foreground shadow-2xl backdrop-blur-md',
        'md:bottom-6 md:right-6'
      )}
    >
      <header className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <span aria-hidden>✦</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">AI-консультант</div>
            <div className="text-xs text-muted-foreground">Студия Орбита</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="rounded-md p-1.5 text-primary transition hover:bg-accent"
              aria-label="Очистить диалог"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-primary transition hover:bg-accent"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
      >
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="rounded-xl bg-muted p-3">
              Здравствуйте! Я знаю всё о продуктах и кейсах Студии Орбита.
              Спросите про задачу — подберу решение, цену и сроки.
            </div>
            <div className="space-y-1.5">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="block w-full rounded-lg border border-border px-3 py-2 text-left text-xs text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'flex',
              m.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              {m.content || (
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
                </span>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
            Ошибка: {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-border bg-background/40 p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-card px-3 py-2 focus-within:border-primary/50">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Спросите что-нибудь…"
            rows={1}
            disabled={status === 'streaming'}
            className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || status === 'streaming'}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            aria-label="Отправить"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Демо AI-консультанта на Anthropic Messages API. Без ключа — отвечает заглушкой.
        </p>
      </form>
    </div>
  );
}
