// import Mail from "../../modules/mail.js";
import sendBulkMail from "../../utils/sendBulkMail.js";
import logger from '../../../logger/index.js';

export default async function bulkMail(req, res) {

    const { mailList } = req.body;

    if (!mailList)
        return res.send({
            sendMail: false,
            message: "Fields not provided",
        });

    function splitArrayIntoChunks(arr, chunkSize = 600) {

        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }

        return result;
    }

    try {
        const mailChunks = splitArrayIntoChunks(mailList);

        for (const mailChunk of mailChunks) {
            const emailRes = await sendBulkMail(mailChunk);
            if (!emailRes) {
                throw new Error('Failed to send bulk mail');
            }
        }

        return res.send({
            sendMail: true,
            message: "Bulk mail sent.",
        });

    } catch (error) {
        logger.log('error', error);
        return res.send({
            sendMail: false,
            message: "Failed to send bulk mail.",
        });
    }

}