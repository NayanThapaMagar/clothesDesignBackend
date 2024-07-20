import mongoose from 'mongoose';

const { Schema } = mongoose;

const prizeSchema = new Schema({
    prize: { type: String, required: true },
    color: { type: String, required: true }
});

const spinWheelPrizesSchema = new Schema({
    prizes: [prizeSchema]
});

const SpinWheelPrizes = mongoose.model('SpinWheelPrizes', spinWheelPrizesSchema);
export default SpinWheelPrizes;
