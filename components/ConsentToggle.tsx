"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Toggle } from "@/components/ui/Toggle";

interface ConsentToggleProps {
  label: string;
  description: string;
  value: boolean | null;
  onChange: (val: boolean) => void;
}

export function ConsentToggle({ label, description, value, onChange }: ConsentToggleProps) {
  const [saved, setSaved] = useState(false);

  function handleChange(val: boolean) {
    onChange(val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex items-start gap-4 py-4 border-b border-neutral-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium text-neutral-900 text-sm">{label}</p>
          {saved && (
            <span className="flex items-center gap-1 text-success-700 text-xs font-medium animate-pulse">
              <CheckIcon className="h-3 w-3" aria-hidden="true" />
              Lagret ✓
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0 pt-0.5">
        <Toggle
          checked={value ?? false}
          onChange={handleChange}
          label={label}
        />
      </div>
    </div>
  );
}
