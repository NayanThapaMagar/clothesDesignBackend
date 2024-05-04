// requiring addStaff schema
import contactUs from "../../modules/contactUs";

// module.exports = async (req, res) => {

export default async function contactUsHandler(req, res) {

    console.log(contactUs);
    // //connectiong to database
    // // getting data from body or frontend
    // const { staffName, address, contact_No, status, remarks } = req.body;

    // //checking whether the user provide all the details or not
    // if (!staffName || !address || !contact_No || !status || !remarks)
    //     return res.send({
    //         StaffAdded: false,
    //         message: "All fields not provided",
    //     });


    // try {
    //     // creating an instance of addStaff schema
    //     const newstaff = new addStaff({
    //         StaffName: staffName,
    //         Address: address,
    //         Contact_No: contact_No,
    //         Status: status,
    //         Remarks: remarks,
    //     });

    //     // adding new instance to the database(adding new  Staff)
    //     await newstaff
    //         .save()
    //         .then((result) => {
    //             // New  staff added successfully
    //             res.json({
    //                 addStaff: true,
    //                 message: "Staff Added successfully",
    //             });
    //             return;
    //         })
    //         .catch((err) => {
    //             res.send({
    //                 addStaff: false,
    //                 message: "Failed to add new Staff",
    //             });
    //         });
    // } catch (err) {
    //     //catching error if there is something while saving Staff details
    //     res.send({
    //         addStaff: false,
    //         message: "Failed to add new Staff",
    //     });
    // }
    // return;
};
