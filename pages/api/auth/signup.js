import nc from "next-connect";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import { createActivationToken } from "../../../utils/token";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmailTemplate } from "../../../email/activateEmailTemplate";
import { createResetToken } from "../../../utils/token";


const handler = nc();





handler.post(async (req, res) => {



  try {
    await db.connect_Db();
    const { name, email, password } = req.body;
  


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }


    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }


    const user = await User.findOne({ email });


    if (user) {
      return res.status(400).json({ message: "This email aleady exist" });
    }



    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();



    const activation_token = createActivationToken({
      id: addedUser._id.toString(),});
    const url=`${process.env.BASE_URL}/activate/${activation_token}`;
   
sendEmail(email,url,"","Activate your account",activateEmailTemplate)
res.status(200).json({ message: "Registration successful! Please check your email to activate your account." });
  } 
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
