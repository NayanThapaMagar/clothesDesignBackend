import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// creating a schema for adding Staff
const winnerPrizeSchema = new Schema({
    iv: {
        type: String,
        required: true,
        unique: true,
    },
    prize: {
        type: String,
        required: true,
    },
},
    { timestamps: false }
);

const winnerPrize = mongoose.model("winnerPrize", winnerPrizeSchema);
export default winnerPrize;


