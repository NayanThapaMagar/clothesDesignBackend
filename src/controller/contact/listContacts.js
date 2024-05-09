// requiring contactUs schema
import contactUs from "../../modules/contactUs.js";


export default async function listContacts(req, res) {

    try {
        contactUs
            .find()
            .then((contacts) => {
                return res.status(200).send({
                    fetchContacts: true,
                    contacts: contacts,
                    message: "Contacts fetch Sucessful",
                });
            })

    } catch (err) {
        //catching error if there is something while saving contactUs details
        return res.status(500).send({
            fetchContacts: false,
            message: "Failed to fetch contacts",
        });
    }
};
