import {NextResponse} from 'next/server';
import Stripe from 'stripe';
import {markPaid} from '@/lib/server/orders';

export async function POST(request:Request){const key=process.env.STRIPE_SECRET_KEY;const secret=process.env.STRIPE_WEBHOOK_SECRET;const signature=request.headers.get('stripe-signature');if(!key||!secret||!signature)return NextResponse.json({error:'Webhook is not configured.'},{status:503});try{const stripe=new Stripe(key);const event=stripe.webhooks.constructEvent(await request.text(),signature,secret);if(event.type==='checkout.session.completed'){const session=event.data.object;const reference=session.metadata?.orderReference;if(reference)await markPaid(reference,session.id,event.id)}return NextResponse.json({received:true});}catch(error){console.error('stripe webhook rejected',error);return NextResponse.json({error:'Invalid webhook signature.'},{status:400})}}
