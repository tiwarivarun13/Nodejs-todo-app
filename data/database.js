import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then((c)=>{
    console.log(`Database connected successfully with ${c.connection.host}`);
}).catch((err)=>{
    console.log(err)
})
}