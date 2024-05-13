import Mail from "../../modules/mail.js";
import logger from '../../../logger/index.js';

export default async function saveMail(req, res) {
    const { subject, title, compalyName, body, remarks, image } = req.body;

    if (!subject || !title || !compalyName || !body || !remarks || !image)
        return res.send({
            saveMail: false,
            message: "All fields not provided",
        });


    try {
        const mail = await Mail.findOne({});
        if (mail) {
            const _id = mail._id;
            await Mail
                .updateMany(
                    { _id: _id },
                    {
                        $set: {
                            subject: subject,
                            title: title,
                            compalyName: compalyName,
                            body: body,
                            remarks: remarks,
                            image: image,
                        },
                    },
                    { new: true }
                )
                .then(() => {
                    return res.status(200).send({
                        saveMail: true,
                        message: "Mail Updated.",
                    })
                })

        } else {
            const newMail = new Mail({
                subject: subject,
                title: title,
                compalyName: compalyName,
                body: body,
                remarks: remarks,
                image: image,
            });

            await newMail.save()
                .then(() => {
                    return res.status(200).send({
                        saveMail: true,
                        message: "Mail saved.",
                    })
                });
        }

    } catch (error) {
        logger.log('error', error);
        return res.send({
            saveMail: false,
            message: "Failed to save mail.",
        });
    }

}