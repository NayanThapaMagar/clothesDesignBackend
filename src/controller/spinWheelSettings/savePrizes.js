import logger from '../../../logger/index.js';
import SpinWheelPrizes from "../../modules/spinWheelPrizes.js";

export default async function savePrizes(req, res) {
    const { prizesArray } = req.body;

    if (!prizesArray || prizesArray.length === 0) {
        return res.send({
            savePrizes: false,
            message: "Fields not provided",
        });
    }

    try {
        const existingPrizes = await SpinWheelPrizes.findOne({});
        if (existingPrizes) {
            const { _id } = existingPrizes;
            await SpinWheelPrizes.updateOne(
                { _id },
                { $set: { prizes: prizesArray } },
                { new: true }
            )
                .then(() => {
                    return res.status(200).send({
                        savePrizes: true,
                        message: "Prizes Updated.",
                    });
                })

        } else {
            const newPrizes = new SpinWheelPrizes({ prizes: prizesArray });

            await newPrizes.save()
                .then(() => {
                    return res.status(200).send({
                        savePrizes: true,
                        message: "Prizes saved.",
                    });
                })

        }
    } catch (error) {
        logger.error(error);
        return res.send({
            savePrizes: false,
            message: "Failed to save prizes.",
        });
    }
}
