import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    PhoneNo: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Design: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const contactUs = mongoose.model("contactUs", contactUsSchema);
export default contactUs;


