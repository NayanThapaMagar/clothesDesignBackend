import Mail from "../../modules/mail.js";
import logger from '../../../logger/index.js';
import uploadOnCloudinary from '../../utils/cloudinary.js'

export default async function saveMail(req, res) {
    const { subject, title, compalyName, body, remarks } = req.body;

    const imageFile = req.file;

    if (!subject || !title || !compalyName || !body || !remarks || !imageFile)
        return res.send({
            saveMail: false,
            message: "All fields not provided",
        });


    try {

        const uploadedImage = await uploadOnCloudinary(imageFile.path);

        if (uploadedImage) {
            const imageUrl = uploadedImage.url;
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
                                image: imageUrl,
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
                    image: imageUrl,
                });

                await newMail.save()
                    .then(() => {
                        return res.status(200).send({
                            saveMail: true,
                            message: "Mail saved.",
                        })
                    });
            }
        } else {
            return res.send({
                saveMail: false,
                message: "Failed to updaod Image.",
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