import { User } from "../models/userModel.js";

export const signUpCallback = async (req,res)=>{
    try{
        const {id,firstName,lastName,imageUrl} = req.body;

        const user = await User.findOne({clerkId:id});

        if(!user){
            await User.create({
                clerkId:id,
                fullName:`${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl
            })
        }
        res.status(200).json({success:true});
    }catch(error){
       console.log("error in auth callback",error);
       res.status(500).json({message:"internal server error",error})
    }};