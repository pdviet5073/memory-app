import dotenv from "dotenv";

import mongoose from "mongoose";

async function connect() {
    dotenv.config();
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("connect successfully");
    } catch (error) {
        console.log("connect failed");
    }
}

export default connect;
