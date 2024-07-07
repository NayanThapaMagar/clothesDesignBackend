import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerDescriptionSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Description: {
        type: String,
        text: true,
        required: true,
    }
},
    { timestamps: true }
)

const customerDescription = mongoose.model("customerDescription", customerDescriptionSchema);
export default customerDescription;