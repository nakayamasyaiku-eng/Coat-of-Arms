import {describe,expect,it} from 'vitest';
import {inquirySchema} from './schemas';

const validInquiry={name:'Ada Lovelace',email:'ada@example.com',phone:'+44 12345',country:'United Kingdom',work:'Prague',message:'Please share acquisition details.'};
describe('private inquiry validation',()=>{
  it('accepts a complete inquiry',()=>{expect(inquirySchema.safeParse(validInquiry).success).toBe(true)});
  it('rejects malformed email addresses',()=>{expect(inquirySchema.safeParse({...validInquiry,email:'not-an-email'}).success).toBe(false)});
  it('requires an artwork and a meaningful message',()=>{expect(inquirySchema.safeParse({...validInquiry,work:'',message:'Hi'}).success).toBe(false)});
});
