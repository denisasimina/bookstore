import nc from "next-connect";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import bcrypt from "bcrypt"
import User from "../../../models/User";
import { createActivationToken } from "../../../utils/token";
import { sendEmail } from "../../../utils/sendEmails";
import { ResetEmailTemplate } from "../../../email/resetEmailTemplate";
import { youtube } from "googleapis/build/src/apis/youtube";

import { createResetToken } from "../../../utils/token";

const handler = nc();





handler.put(async (req, res) => {

 

  try {
    await db.connect_Db();
    const {user_id,password } = req.body;
  
    const user=await User.findById(user_id);

if(!user)
{
  return res.json.status(400)
  .json({message:"this account doesn t exist"});
} 





const cryptedPassword=await bcrypt.hash(password,12)
await user.updateOne({
  password:cryptedPassword,
})

res.json({email:user.email})
await db.disconnect_DB();}
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
