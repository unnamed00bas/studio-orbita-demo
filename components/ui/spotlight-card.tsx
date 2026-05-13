'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility — все варианты теперь рендерятся в монохромный синий. */
  glowColor?: GlowColor;
  width?: string | number;
  height?: string | number;
}

export function GlowCard({
  children,
  className,
  width,
  height,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--x', `${x}`);
      el.style.setProperty('--y', `${y}`);
    };
    document.addEventListener('pointermove', onMove);
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  const style = {
    '--size': '260',
    '--spotlight-size': 'calc(var(--size) * 1px)',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--primary) / 0.22),
      transparent 70%
    )`,
    ...(width !== undefined && {
      width: typeof width === 'number' ? `${width}px` : width,
    }),
    ...(height !== undefined && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card transition-colors',
        'hover:border-primary/40',
        className
      )}
      style={style}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
