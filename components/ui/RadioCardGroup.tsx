'use client';

import { cn } from '@/lib/utils/cn';

export interface RadioCardOption<TValue extends string> {
  value: TValue;
  label: string;
  description: string;
}

interface RadioCardGroupProps<TValue extends string> {
  name: string;
  legend: string;
  value: TValue | '';
  onChange: (value: TValue) => void;
  options: ReadonlyArray<RadioCardOption<TValue>>;
  error?: string;
}

/**
 * Two-up choice rendered as cards. Real radio inputs stay in the markup and
 * are only visually hidden, so arrow-key navigation and the accessible name
 * behave exactly as a native group would.
 */
export function RadioCardGroup<TValue extends string>({
  name,
  legend,
  value,
  onChange,
  options,
  error,
}: RadioCardGroupProps<TValue>) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-2.5 text-sm font-medium text-ink">{legend}</legend>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value;
          const id = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                'group relative cursor-pointer rounded-card border p-4',
                'transition-[border-color,background-color,transform] duration-200 ease-surface',
                'focus-within:ring-2 focus-within:ring-mint-400 focus-within:ring-offset-2 focus-within:ring-offset-void',
                isSelected
                  ? 'border-mint-500/50 bg-mint-500/[0.07]'
                  : 'border-hairline bg-white/[0.02] hover:-translate-y-0.5 hover:border-hairline-strong',
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
                aria-describedby={`${id}-description`}
              />

              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                    isSelected ? 'border-mint-400' : 'border-hairline-strong',
                  )}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full bg-mint-400 transition-transform duration-200',
                      isSelected ? 'scale-100' : 'scale-0',
                    )}
                  />
                </span>

                <span className="space-y-1">
                  <span className="block text-sm font-medium text-ink">{option.label}</span>
                  <span id={`${id}-description`} className="block text-xs leading-relaxed text-ink-faint">
                    {option.description}
                  </span>
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
