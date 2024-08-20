// requiring contactUs schema
import Key from "../../modules/Key.js";
import logger from '../../../logger/index.js'


export default async function listContacts(req, res) {

    try {
        Key
            .findOne()
            .then((encryptionKey) => {
                return res.status(200).send({
                    fetchEncryptionKey: true,
                    encryptionKey: encryptionKey,
                    message: "EncryptionKey fetch Sucessful",
                });
            })

    } catch (error) {
        logger.log('error', error);
        return res.status(500).send({
            fetchEncryptionKey: false,
            message: "Failed to fetch EncryptionKey",
        });
    }
};
