'use client';

import { useState, useEffect, useRef } from 'react';

interface CustomDatePopoverProps {
  onClose: () => void;
  onApply: (from: string, to: string) => void;
  initialFrom?: string;
  initialTo?: string;
}

export function CustomDatePopover({
  onClose,
  onApply,
  initialFrom = '',
  initialTo = '',
}: CustomDatePopoverProps) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(from, to);
    onClose();
  };

  const handleReset = () => {
    setFrom('');
    setTo('');
    onApply('', '');
    onClose();
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Custom date range filter"
      className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-line bg-white p-4 shadow-xl ring-1 ring-black/5"
    >
      <form onSubmit={handleApply} className="space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Custom Date Range
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-ink text-xs font-medium"
          >
            &times;
          </button>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="dashboard-custom-from" className="block text-xs font-medium text-ink">
            From Date
          </label>
          <input
            id="dashboard-custom-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-8 w-full rounded-md border border-line px-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="dashboard-custom-to" className="block text-xs font-medium text-ink">
            To Date
          </label>
          <input
            id="dashboard-custom-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-8 w-full rounded-md border border-line px-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-muted hover:text-ink font-medium"
          >
            Reset
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand-600 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-700"
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
