import mongoose from 'mongoose';

export async function connection(){
    try{
         await  mongoose
            .connect('mongodb://localhost:27017/todo')
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log(e.message)
    }

}