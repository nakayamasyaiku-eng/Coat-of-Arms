'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {inquirySchema} from '@/lib/schemas';
import type {z} from 'zod';

type Inquiry = z.infer<typeof inquirySchema>;
type WorkOption = {slug: string; label: string; sku: string};

export function ContactForm({works, selectedWork}: {works: WorkOption[]; selectedWork?: string}) {
  const t = useTranslations('Contact');
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {work: selectedWork || 'general'}
  });

  const submit = async (data: Inquiry) => {
    setServerError('');
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      setServerError(t('error'));
      return;
    }
    setSent(true);
    reset({work: selectedWork || 'general'});
  };

  return <form className="paper-form compact inquiry-form" onSubmit={handleSubmit(submit)}>
    <label>{t('work')}
      <select {...register('work')} aria-invalid={!!errors.work}>
        <option value="general">{t('general')}</option>
        {works.map((work) => <option key={work.slug} value={work.slug}>{work.label} · {work.sku}</option>)}
      </select>
    </label>
    <div className="form-grid">
      <label>{t('name')}<input {...register('name')} aria-invalid={!!errors.name}/>{errors.name&&<span>{errors.name.message}</span>}</label>
      <label>{t('email')}<input type="email" {...register('email')} aria-invalid={!!errors.email}/>{errors.email&&<span>{errors.email.message}</span>}</label>
      <label>{t('phone')}<input {...register('phone')} /></label>
      <label>{t('country')}<input {...register('country')} /></label>
    </div>
    <label>{t('message')}<textarea rows={6} {...register('message')} placeholder={t('messagePlaceholder')} aria-invalid={!!errors.message}/></label>
    <button className="button primary" disabled={isSubmitting}>{t('send')}</button>
    {serverError&&<p className="form-error" role="alert">{serverError}</p>}
    {sent&&<p className="form-success" role="status">{t('success')}</p>}
  </form>;
}
