import React from 'react';
import { cn } from '@/lib/utils';

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number | '100%';
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 320,
  width,
}: FlippingCardProps) {
  const useFullWidth = width === undefined || width === '100%';
  return (
    <div
      className={cn(
        'group/flipping-card [perspective:1000px]',
        useFullWidth && 'w-full'
      )}
      style={
        {
          '--height': `${height}px`,
          ...(!useFullWidth && typeof width === 'number'
            ? { '--width': `${width}px` }
            : {}),
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'relative rounded-xl border border-border bg-card shadow-lg transition-all duration-700',
          '[transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]',
          'h-[var(--height)]',
          useFullWidth ? 'w-full' : 'w-[var(--width)]',
          className
        )}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[inherit] bg-card text-card-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="h-full w-full">{frontContent}</div>
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[inherit] bg-card text-card-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="h-full w-full">{backContent}</div>
        </div>
      </div>
    </div>
  );
}
