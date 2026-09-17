import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';
import { controlStyles } from './styles';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}

/**
 * Shared label / hint / error scaffolding. The error is wired to the control
 * through aria-describedby and announced politely, so a screen reader hears
 * the correction without losing the current position.
 */
function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm text-ink">
        <span className="font-medium">{label}</span>
        {optional ? <span className="text-xs text-ink-faint">необязательно</span> : null}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
}

export function TextField({ label, error, hint, optional, className, ...props }: TextFieldProps) {
  const generatedId = useId();
  const id = props.name ? `field-${props.name}` : generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        className={controlStyles(Boolean(error), cn('h-11', className))}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
}

export function TextAreaField({
  label,
  error,
  hint,
  optional,
  className,
  rows = 5,
  ...props
}: TextAreaFieldProps) {
  const generatedId = useId();
  const id = props.name ? `field-${props.name}` : generatedId;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        rows={rows}
        className={controlStyles(Boolean(error), cn('resize-y py-3 leading-relaxed', className))}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  hint,
  required,
  disabled,
}: SelectFieldProps) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlStyles(Boolean(error), 'h-11 appearance-none pr-10')}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Native select arrows differ per platform and none of them match the
            palette, so the control is un-styled and the chevron is drawn here. */}
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}

interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  error?: string;
  children: ReactNode;
}

export function CheckboxField({
  name,
  checked,
  onChange,
  onBlur,
  error,
  children,
}: CheckboxFieldProps) {
  const id = `field-${name}`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[5px] border bg-void/60',
            'accent-mint-500 transition-colors duration-200',
            error ? 'border-red-500/60' : 'border-hairline-strong',
          )}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-muted">
          {children}
        </label>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="pl-[30px] text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
