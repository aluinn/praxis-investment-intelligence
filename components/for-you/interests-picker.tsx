"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ASSETS } from "@/data/assets";
import { cn } from "@/lib/cn";

const MAX_INTERESTS = 5;

export function InterestsPicker({
  open,
  onClose,
  selected,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onSave: (symbols: string[]) => void;
}) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(selected);
  }

  const toggle = (symbol: string) => {
    setDraft((current) => {
      if (current.includes(symbol)) return current.filter((item) => item !== symbol);
      if (current.length >= MAX_INTERESTS) return current;
      return [...current, symbol];
    });
  };

  const submit = () => {
    onSave(draft);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Pick your coins"
      description={`Choose up to ${MAX_INTERESTS} coins to personalize your For You feed.`}
      wide
    >
      <p className="text-sm font-medium text-foreground" aria-live="polite">
        {draft.length}/{MAX_INTERESTS} selected
      </p>
      <div
        className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4"
        role="group"
        aria-label={`Choose up to ${MAX_INTERESTS} coins`}
      >
        {ASSETS.map((asset) => {
          const isSelected = draft.includes(asset.symbol);
          const disabled = !isSelected && draft.length >= MAX_INTERESTS;
          return (
            <button
              key={asset.symbol}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggle(asset.symbol)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-[18px] border px-2 py-4 text-center transition-all duration-200",
                isSelected
                  ? "border-primary/70 bg-gradient-to-b from-primary/25 to-primary/5 shadow-[0_0_24px_-6px_rgba(153,69,255,0.7)]"
                  : "border-white/10 bg-white/[0.02] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10",
                disabled ? "pointer-events-none opacity-35" : "",
              )}
            >
              {isSelected ? (
                <span className="absolute right-2 top-2 grid size-4 place-items-center rounded-full bg-gradient-to-br from-primary to-[#14f195] text-[10px] font-bold leading-none text-white">
                  ✓
                </span>
              ) : null}
              <span
                className="grid size-11 place-items-center rounded-full text-[11px] font-semibold ring-1 ring-white/10"
                style={{ color: asset.color, background: `linear-gradient(145deg, ${asset.color}33, ${asset.color}0d)` }}
              >
                {asset.symbol.slice(0, 4)}
              </span>
              <span className={cn("text-xs", isSelected ? "text-foreground" : "text-muted")}>{asset.name}</span>
            </button>
          );
        })}
      </div>
      <Button type="button" className="mt-5 w-full" onClick={submit}>
        Save
      </Button>
    </Dialog>
  );
}
