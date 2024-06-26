import express from 'express';
export const router = express.Router();

import { upload } from '../middleware/multer.middleware.js';


import contactUsHandler from '../controller/contactUs/contactUs.js';

import saveMail from '../controller/mail/saveMail.js';


import listContacts from '../controller/contact/listContacts.js';


// //-----------------------------------------REQUEST HANDELING--------------------------------------------


router.get("/", (req, res) => {
    res.send("app is working...")
});

router.post("/contactUs", contactUsHandler);

// router.post("/saveMail", saveMail);
router.post("/saveMail", upload.single('image'), saveMail);

router.get("/listContacts", listContacts);



