'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {inquirySchema} from '@/lib/schemas';
import type {z} from 'zod';

type Inquiry = z.infer<typeof inquirySchema>;
export function ContactForm(){const t=useTranslations('Contact');const [sent,setSent]=useState(false);const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<Inquiry>({resolver:zodResolver(inquirySchema)});const submit=async(data:Inquiry)=>{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error('Unable to send');setSent(true);reset();};return <form className="paper-form compact" onSubmit={handleSubmit(submit)}><div className="form-grid"><label>{t('name')}<input {...register('name')} aria-invalid={!!errors.name}/>{errors.name&&<span>{errors.name.message}</span>}</label><label>{t('email')}<input type="email" {...register('email')} aria-invalid={!!errors.email}/>{errors.email&&<span>{errors.email.message}</span>}</label></div><label>{t('subject')}<input {...register('subject')} placeholder={t('subjectPlaceholder')} aria-invalid={!!errors.subject}/></label><label>{t('message')}<textarea rows={7} {...register('message')} placeholder={t('messagePlaceholder')} aria-invalid={!!errors.message}/></label><button className="button primary" disabled={isSubmitting}>{t('send')}</button>{sent&&<p className="form-success" role="status">{t('success')}</p>}</form>}
