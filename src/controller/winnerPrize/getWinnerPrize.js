// requiring winnerPrize schema
import WinnerPrize from "../../modules/winnerPrize.js";
import logger from '../../../logger/index.js';

export default async function getWinnerPrize(req, res) {

    // getting data from body or frontend
    const iv = req.params.iv;

    //checking whether we've provide all the details or not
    if (!iv)
        return res.send({
            setWinnerPrize: false,
            message: "All fields not provided",
        });
    try {

        await WinnerPrize
            .findOne({ iv: iv })
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        getWinnerPrize: true,
                        prizeWon: result.prize,
                    });
                } else {
                    return res.status(200).json({
                        getWinnerPrize: true,
                        prizeWon: null,
                    });
                }

            });
    } catch (error) {
        logger.log('error', error);
        return res.status(500).json({
            getWinnerPrize: false,
            message: "Error while getting winnerPrize",
        });
    }
};
