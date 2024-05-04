import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// creating a schema for adding Staff
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
    },
    Design: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

// wrapping staffschema in an object
export const contactUs = mongoose.model("contactUs", contactUsSchema);

// exporting staff schema
// module.exports = addStaff;
