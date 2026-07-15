import {NextResponse} from 'next/server';
import {z} from 'zod';
import {contactSchema} from '@/lib/schemas';
import {products} from '@/lib/products';
import {createReference,saveDraft} from '@/lib/server/orders';
import {rateLimit} from '@/lib/server/rate-limit';

const bodySchema=z.object({contact:contactSchema,slugs:z.array(z.string()).min(1).max(9)});
export async function POST(request:Request){const ip=request.headers.get('x-forwarded-for')||'local';if(!rateLimit(`contact:${ip}`,8))return NextResponse.json({error:'Too many requests. Please wait a moment.'},{status:429});try{const data=bodySchema.parse(await request.json());const valid=new Set(products.filter(p=>p.available).map(p=>p.slug));if(data.slugs.some(slug=>!valid.has(slug)))return NextResponse.json({error:'One of the selected works is no longer available.'},{status:409});const reference=createReference();await saveDraft(reference,data.slugs,data.contact);return NextResponse.json({orderReference:reference});}catch(error){console.error('contact submission failed',error);return NextResponse.json({error:'Please check the contact and delivery details.'},{status:400})}}
