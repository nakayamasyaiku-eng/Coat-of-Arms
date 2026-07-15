import {describe,expect,it} from 'vitest';
import {contactSchema,checkoutSchema} from './schemas';

const validContact={name:'Ada Lovelace',email:'ada@example.com',phone:'+44 12345',country:'United Kingdom',address:'10 Archive Lane',city:'London',postal:'SW1A 1AA',language:'en' as const,consent:true};
describe('checkout validation',()=>{
  it('requires explicit privacy and contact consent',()=>{expect(contactSchema.safeParse({...validContact,consent:false}).success).toBe(false)});
  it('rejects malformed contact records',()=>{expect(contactSchema.safeParse({...validContact,email:'not-an-email'}).success).toBe(false)});
  it('accepts a server-verifiable checkout payload',()=>{expect(checkoutSchema.safeParse({slugs:['prague'],contact:validContact,orderReference:'COA-20260715-ABC12345',locale:'en'}).success).toBe(true)});
});
