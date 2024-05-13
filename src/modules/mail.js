import mongoose, { Schema } from "mongoose";

const Scema = mongoose.Schema;

const mailSchema = new Schema({
    subject: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    compalyName: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    remarks: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
})

const Mail = mongoose.model('mail', mailSchema);
export default Mail;