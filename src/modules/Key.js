import mongoose from "mongoose";

const Schema = mongoose.Schema;

const keySchema = new Schema({
    key: {
        type: Buffer,
        require: true,
    },
})

const Key = mongoose.model('key', keySchema);
export default Key;