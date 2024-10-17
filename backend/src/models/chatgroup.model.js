import mongoose from "mongoose";

const ChatgroupModel = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
},{timestamps:true});
export const Chatgroup = mongoose.model("Chatgroup", ChatgroupModel);
