// requiring contactUs schema
import contactUs from "../../modules/contactUs.js";
import sendMail from "../../utils/sendMail.js";
import logger from '../../../logger/index.js';
// module.exports = async (req, res) => {

export default async function contactUsHandler(req, res) {

    // // getting data from body or frontend
    const { name, phoneNo, email, design } = req.body;

    //checking whether the user provide all the details or not
    if (!name || !phoneNo || !email || !design)
        return res.send({
            contactUs: false,
            message: "All fields not provided",
        });
    try {

        // email to admin and form submitter(contactor)
        const Email = ["nm58041719@student.ku.edu.np", email]

        const emailRes = await sendMail(Email, name)

        if (emailRes && emailRes.messageId) {
            // creating an instance of contactUs schema
            const newContactUs = new contactUs({
                Name: name,
                PhoneNo: phoneNo,
                Email: email,
                Design: design,
            });

            // adding new instance to the database(adding new  contactUs)
            await newContactUs
                .save()
                .then(() => {
                    // New  contactUs added successfully
                    return res.status(200).json({
                        contactUs: true,
                        message: "contactUs Added successfully",
                    });
                });
        } else {
            logger.log('info', 'Failed to send email');
            return res.status(500).json({
                contactUs: false,
                message: "Failed to send email",
            });
        }

    } catch (error) {
        logger.log('error', error);
        //catching error if there is something while saving contactUs details
        return res.status(500).json({
            contactUs: false,
            message: "Failed to add new contactUs",
        });
    }
};
