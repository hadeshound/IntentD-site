'use client';

import { Send } from 'lucide-react';
import { useEffect } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { submitContactMessage } from '@/lib/api/contact';
import { CONTACT_TOPICS, contactSchema, type ContactValues } from '@/lib/schemas/contact';
import { useZodForm } from '@/lib/hooks/useZodForm';

interface ContactFormProps {
  /** Pre-selects a topic, e.g. when arriving from the Enterprise CTA. */
  defaultTopic?: ContactValues['topic'];
  /** Hides the optional company field on the compact landing variant. */
  showCompanyField?: boolean;
}

export function ContactForm({ defaultTopic, showCompanyField = true }: ContactFormProps) {
  const form = useZodForm({
    schema: contactSchema,
    initialValues: {
      name: '',
      email: '',
      company: '',
      topic: defaultTopic ?? ('buy_data' as ContactValues['topic']),
      message: '',
      website: '',
    },
    onSubmit: async (values) => {
      await submitContactMessage({
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        topic: values.topic,
        message: values.message,
        website: values.website || undefined,
      });
    },
  });

  const { setValue } = form;

  // The topic can arrive from the query string after the form has mounted.
  useEffect(() => {
    if (defaultTopic) {
      setValue('topic', defaultTopic);
    }
  }, [defaultTopic, setValue]);

  if (form.status === 'success') {
    return (
      <Alert tone="success" title="Заявка отправлена">
        <p>
          Мы получили ваше сообщение и ответим на указанный email. По заявкам на доступ
          к данным менеджер связывается в течение рабочего дня.
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="mt-3 text-sm underline underline-offset-4 transition-colors duration-200 hover:text-mint-200"
        >
          Отправить ещё одно сообщение
        </button>
      </Alert>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Имя"
          name="name"
          autoComplete="name"
          value={form.values.name}
          onChange={(event) => form.setValue('name', event.target.value)}
          onBlur={() => form.markTouched('name')}
          error={form.errorFor('name')}
          required
        />

        <TextField
          label="Рабочий email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.values.email}
          onChange={(event) => form.setValue('email', event.target.value)}
          onBlur={() => form.markTouched('email')}
          error={form.errorFor('email')}
          required
        />
      </div>

      {showCompanyField ? (
        <TextField
          label="Компания"
          name="company"
          autoComplete="organization"
          optional
          value={form.values.company ?? ''}
          onChange={(event) => form.setValue('company', event.target.value)}
          onBlur={() => form.markTouched('company')}
          error={form.errorFor('company')}
        />
      ) : null}

      <SelectField
        label="Тип запроса"
        name="topic"
        value={form.values.topic}
        onChange={(value) => form.setValue('topic', value as ContactValues['topic'])}
        onBlur={() => form.markTouched('topic')}
        options={CONTACT_TOPICS}
        error={form.errorFor('topic')}
        required
      />

      <TextAreaField
        label="Сообщение"
        name="message"
        rows={5}
        placeholder="Опишите задачу: интересующие вертикали, объём, сроки."
        value={form.values.message}
        onChange={(event) => form.setValue('message', event.target.value)}
        onBlur={() => form.markTouched('message')}
        error={form.errorFor('message')}
        required
      />

      {/* Honeypot. Off-screen rather than display:none so naive bots still fill
          it in, and hidden from assistive tech and the tab order. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Не заполняйте это поле</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.values.website ?? ''}
          onChange={(event) => form.setValue('website', event.target.value)}
        />
      </div>

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg" isLoading={form.isSubmitting} loadingLabel="Отправляем…">
          Отправить запрос
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>

        <p className="text-xs leading-relaxed text-ink-faint">
          Отправляя форму, вы соглашаетесь с обработкой контактных данных
          <br className="hidden sm:block" /> в соответствии с нашей политикой конфиденциальности.
        </p>
      </div>
    </form>
  );
}
