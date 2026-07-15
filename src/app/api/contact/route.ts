import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {inquirySchema} from '@/lib/schemas';
import {rateLimit} from '@/lib/server/rate-limit';

export async function POST(request:Request){const ip=request.headers.get('x-forwarded-for')||'local';if(!rateLimit(`inquiry:${ip}`,5))return NextResponse.json({error:'Too many messages.'},{status:429});try{const data=inquirySchema.parse(await request.json());if(process.env.RESEND_API_KEY&&process.env.ORDER_NOTIFICATION_EMAIL){const resend=new Resend(process.env.RESEND_API_KEY);await resend.emails.send({from:process.env.RESEND_FROM_EMAIL||'Coat of Arms <onboarding@resend.dev>',to:process.env.ORDER_NOTIFICATION_EMAIL,replyTo:data.email,subject:`Coat of Arms inquiry: ${data.subject}`,text:`From: ${data.name} <${data.email}>\n\n${data.message}`})}else{console.info('Development inquiry received',data.subject)}return NextResponse.json({ok:true});}catch(error){console.error('inquiry failed',error);return NextResponse.json({error:'Please check your message.'},{status:400})}}
