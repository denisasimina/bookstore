import nc from "next-connect";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";

import User from "../../../models/User";
import { createActivationToken } from "../../../utils/token";
import { sendEmail } from "../../../utils/sendEmails";
import { ResetEmailTemplate } from "../../../email/resetEmailTemplate";
import { youtube } from "googleapis/build/src/apis/youtube";

import { createResetToken } from "../../../utils/token";


const handler = nc();





handler.post(async (req, res) => {


  try {
    await db.connect_Db();
    const {  email } = req.body;
  


    if ( !email ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }


    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }


    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({ message: "This email doesn't  exist" });
    }

    const user_id=createResetToken({
        id: user._id.toString(),
    })




    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;


   
    sendEmail(email,url,"","Reset your password",ResetEmailTemplate)
  
await db.disconnect_DB();
res.json({
    message:"An email has been sent to you"
})
} 
 



catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
