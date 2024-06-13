import mongoose from "mongoose";
import config from "../app/config";

const connectToDB=async()=>{
    try{
        const connectToDB=await mongoose.connect(config.database_url as string);
        if(connectToDB){
            console.log('dataBase connected ');

        }

    }catch(err){
        console.log('mongodb connection error',err);
        process.exit(1)   
    }
}
export default connectToDB