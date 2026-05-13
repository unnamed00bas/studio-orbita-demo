'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatPanel } from './ChatPanel';

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  if (open) return <ChatPanel onClose={() => setOpen(false)} />;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:shadow-xl animate-pulse-glow"
      aria-label="Открыть AI-консультанта"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
