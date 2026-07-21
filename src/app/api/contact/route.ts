import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {inquirySchema} from '@/lib/schemas';
import {rateLimit} from '@/lib/server/rate-limit';

export async function POST(request:Request){
  const ip=request.headers.get('x-forwarded-for')||'local';
  if(!rateLimit(`inquiry:${ip}`,5))return NextResponse.json({error:'Too many messages.'},{status:429});
  try{
    const data=inquirySchema.parse(await request.json());
    const recipient=process.env.ORDER_TO_EMAIL||process.env.ORDER_NOTIFICATION_EMAIL||'Sakura956904363@outlook.com';
    if(process.env.RESEND_API_KEY){
      const resend=new Resend(process.env.RESEND_API_KEY);
      const {error}=await resend.emails.send({
        from:process.env.RESEND_FROM_EMAIL||'Coat of Arms <onboarding@resend.dev>',
        to:recipient,
        replyTo:data.email,
        subject:`Coat of Arms private inquiry · ${data.work}`,
        text:[
          `Work: ${data.work}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone||'—'}`,
          `Country: ${data.country||'—'}`,
          '',
          data.message
        ].join('\n')
      });
      if(error)throw new Error(error.message);
    }else{
      if(process.env.NODE_ENV==='production')return NextResponse.json({error:'Inquiry email is not configured.'},{status:503});
      console.info('Development inquiry received',data.work,recipient);
    }
    return NextResponse.json({ok:true});
  }catch(error){
    console.error('inquiry failed',error);
    return NextResponse.json({error:'Please check your message.'},{status:400});
  }
}
