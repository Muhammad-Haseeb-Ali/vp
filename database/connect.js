// mongodb+srv://admin:<password>@proposals.wmemj9c.mongodb.net/?retryWrites=true&w=majority

import mongoose from "mongoose";

const connect = async ()=>{
    await mongoose.connect("mongodb+srv://admin:u2Us4eLnbtF9fMv@proposals.wmemj9c.mongodb.net/?retryWrites=true&w=majority")
    console.log("Hurry! Database is Connected Successfully.")
}

export default connect;