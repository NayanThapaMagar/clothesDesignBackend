import sendMail from "../../utils/sendMail.js";
import Key from "../../modules/Key.js";
import crypto from 'crypto';
import logger from '../../../logger/index.js';

export default async function bulkMail(req, res) {

    const {
        contactList
    } = req.body;

    const encryptonKey = crypto.randomBytes(32);

    if (!contactList)
        return res.send({
            sendMail: false,
            message: "Fields not provided",
        });
    try {
        const key = await Key.findOne({});
        if (key) {
            const _id = key._id;
            await Key
                .updateMany(
                    { _id: _id },
                    {
                        $set: {
                            key: encryptonKey,
                        },
                    },
                    { new: true }
                )
        } else {
            const newKey = new Key({
                key: encryptonKey,
            });

            await newKey.save()
        }
        // sending email one by one 
        for (const contact of contactList) {
            const emailRes = await sendMail(contact.Email, contact.Name, encryptonKey);
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