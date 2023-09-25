import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import  bcryptjs  from 'bcryptjs'

export const sendEmail=async ({email,emailType,userId}:any)=>{
  console.log(email,emailType,userId);
  

   try {
   const hashedToken=await bcryptjs.hash(userId.toString(),10)
   if (emailType==='VERIFY'){
       await User.findByIdAndUpdate(userId,{
           verifyToken:hashedToken,
           verifyTokenExpiry:Date.now()+3600000}
       )
   }
   else if (emailType==='RESET'){
    await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now()+3600000}
    )
   }

   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a32cc71d6db3fe",
      pass: "761fb9e23e7e65"
    }
  });
  
  const mailOptions={
    from:'rehman.khan6167@gmail.com',
    to:email,
    subject:`${emailType==='VERIFY'?'verify your email':'Reset your Password'} `,
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType==='VERIFY'?"Verify your email":"reset your Password"} </p>`
  }
  const mailResponse=await transport.sendMail(mailOptions)
  
  return mailResponse;


   } catch (error:any) {
    console.log(error.message);
    
    throw new Error(error.message)
    
   }
}