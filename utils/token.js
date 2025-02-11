
import jwt from "jsonwebtoken";
export const createActivationToken=(payload)=>{
    return jwt.sign(payload,process.env.NEXT_PUBLIC_ACTIVATION_TOKEN_SECRET,
    {expiresIn:"2d",});
}


export const createResetToken=(payload)=>{
    return jwt.sign(payload,process.env.NEXT_PUBLIC_RESET_TOKEN_SECRET,
    {expiresIn:"6h",});
}