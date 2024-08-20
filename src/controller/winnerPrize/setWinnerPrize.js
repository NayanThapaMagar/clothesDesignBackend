// requiring winnerPrize schema
import WinnerPrize from "../../modules/winnerPrize.js";
import logger from '../../../logger/index.js';

export default async function setWinnerPrize(req, res) {

    // getting data from body or frontend
    const { iv, winningPrize } = req.body;

    //checking whether we've provide all the details or not
    if (!iv || !winningPrize)
        return res.send({
            setWinnerPrize: false,
            message: "All fields not provided",
        });
    try {

        const newWinnerPrize = new WinnerPrize({
            iv: iv,
            prize: winningPrize,
        });

        // adding new instance to the database(adding new  winnerPrize)
        await newWinnerPrize
            .save()
            .then(() => {
                // New  winnerPrize added successfully
                return res.status(200).json({
                    setWinnerPrize: true,
                    message: "winnerPrize Added successfully",
                });
            });
    } catch (error) {
        logger.log('error', error);
        //catching error if there is something while saving winnerPrize details
        return res.status(500).json({
            setWinnerPrize: false,
            message: "Failed to add new winnerPrize",
        });
    }
};
