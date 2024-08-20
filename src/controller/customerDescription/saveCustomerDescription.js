import logger from '../../../logger/index.js';
import customerDescription from '../../modules/customerDescription.js';

export default async function saveCustomerDescription(req, res) {

    // getting data from body or frontend
    const { name, email, description } = req.body;

    //checking whether the user provide all the details or not
    if (!name || !email || !description)
        return res.send({
            saveCustomerDescription: false,
            message: "All fields not provided",
        });

    try {

        const CustomerDescription = await customerDescription.findOne({ Email: email });
        if (CustomerDescription) {
            const _id = CustomerDescription._id;
            await customerDescription
                .updateMany(
                    { _id: _id },
                    {
                        $set: {
                            Name: name,
                            Email: email,
                            Description: description,
                        },
                    },
                    { new: true }
                )
                .then(() => {
                    return res.status(200).send({
                        saveCustomerDescription: true,
                        message: "Customer Description updated Succesfully",
                    })
                })

        } else {
            const newCustomerDescription = new customerDescription({
                Name: name,
                Email: email,
                Description: description,
            })

            await newCustomerDescription
                .save()
                .then(() => {
                    return res.status(200).json({
                        saveCustomerDescription: true,
                        message: "Customer Description saved Succesfully",
                    })
                });
        }
    } catch (error) {
        logger.log('error', error);
        //catching error while saving CustomerDescription
        return res.status(500).json({
            saveCustomerDescription: false,
            message: "Failed to save Customer Description",
        });
    }

}