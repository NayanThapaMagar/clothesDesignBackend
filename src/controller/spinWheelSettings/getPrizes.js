import logger from '../../../logger/index.js';
import SpinWheelPrizes from "../../modules/spinWheelPrizes.js";

export default async function getPrizes(req, res) {
    try {
        SpinWheelPrizes.findOne()
            .then((existingPrizes) => {
                return res.status(200).send({
                    getPrizes: true,
                    existingPrizes: existingPrizes,
                });
            })

    } catch (error) {
        logger.error(error);
        return res.send({
            getPrizes: false,
            message: "Failed to get prizes.",
        });
    }
}
