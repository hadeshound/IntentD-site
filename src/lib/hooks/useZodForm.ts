import { useCallback, useMemo, useState, type FormEvent } from 'react';
import type { z } from 'zod';

import { ApiError } from '@/lib/api/client';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FieldErrors<TValues> = Partial<Record<keyof TValues & string, string>>;

interface UseZodFormOptions<TSchema extends z.ZodTypeAny> {
  schema: TSchema;
  initialValues: z.input<TSchema>;
  onSubmit: (values: z.output<TSchema>) => Promise<void>;
}

/**
 * A deliberately small form controller: Zod for the rules, local state for the
 * values, and one place that turns a server ApiError back into per-field
 * messages. Fields only start showing errors once they have been touched, so
 * an untouched form never greets the visitor in red.
 */
export function useZodForm<TSchema extends z.ZodTypeAny>({
  schema,
  initialValues,
  onSubmit,
}: UseZodFormOptions<TSchema>) {
  type Values = z.input<TSchema>;

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<Values>>({});
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const setValue = useCallback(
    <TKey extends keyof Values & string>(field: TKey, value: Values[TKey]) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => {
        if (!(field in current)) {
          return current;
        }
        const next = { ...current };
        delete next[field];
        return next;
      });
      setFormError(null);
      if (status === 'error') {
        setStatus('idle');
      }
    },
    [status],
  );

  const markTouched = useCallback((field: string) => {
    setTouched((current) => ({ ...current, [field]: true }));
  }, []);

  const validate = useCallback((): z.output<TSchema> | null => {
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return result.data as z.output<TSchema>;
    }

    const nextErrors: FieldErrors<Values> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in nextErrors)) {
        nextErrors[field as keyof Values & string] = issue.message;
      }
    }
    setErrors(nextErrors);
    return null;
  }, [schema, values]);

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();

      setFormError(null);
      const parsed = validate();
      if (!parsed) {
        // Reveal every message at once now that the user has asked to submit.
        setTouched((current) => {
          const next = { ...current };
          for (const key of Object.keys(values as object)) {
            next[key] = true;
          }
          return next;
        });
        setStatus('error');
        return;
      }

      setStatus('submitting');
      try {
        await onSubmit(parsed);
        setStatus('success');
      } catch (error) {
        setStatus('error');

        if (error instanceof ApiError && error.isValidationError && error.details) {
          const serverErrors: FieldErrors<Values> = {};
          for (const [field, message] of Object.entries(error.details)) {
            serverErrors[field as keyof Values & string] = message;
          }
          setErrors(serverErrors);
          setFormError(error.message);
          return;
        }

        setFormError(
          error instanceof ApiError
            ? error.message
            : 'Что-то пошло не так. Попробуйте ещё раз.',
        );
      }
    },
    [onSubmit, validate, values],
  );

  /** Error to display for a field: hidden until the field has been touched. */
  const errorFor = useCallback(
    (field: keyof Values & string): string | undefined =>
      touched[field] ? errors[field] : undefined,
    [errors, touched],
  );

  const isSubmitting = status === 'submitting';

  return useMemo(
    () => ({
      values,
      setValue,
      markTouched,
      errorFor,
      errors,
      status,
      isSubmitting,
      formError,
      setFormError,
      setStatus,
      handleSubmit,
      reset: () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setStatus('idle');
        setFormError(null);
      },
    }),
    [
      values,
      setValue,
      markTouched,
      errorFor,
      errors,
      status,
      isSubmitting,
      formError,
      handleSubmit,
      initialValues,
    ],
  );
}
