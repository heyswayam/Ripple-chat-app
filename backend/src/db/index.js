import mongoose from "mongoose"


const connectDB = async()=>{
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URL}ripple-chat-app`)
        console.log(`mongoDB connected !! DB HOST:`,instance.connection.host);
        
    } catch (error) {
        console.log("mongodb connection error", error);
        process.exit(1);
    }
}
export default connectDB;