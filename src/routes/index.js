import express from 'express';
export const router = express.Router();

import { upload } from '../middleware/multer.middleware.js';


import contactUsHandler from '../controller/contactUs/contactUs.js';

import saveMail from '../controller/mail/saveMail.js';

import saveCustomerDescription from '../controller/customerDescription/saveCustomerDescription.js';


import listContacts from '../controller/contact/listContacts.js';

import getEncryptionKey from '../controller/encryptionKey/getEncryptionKey.js';

import bulkMail from '../controller/mail/bulkMail.js';

import savePrizes from '../controller/spinWheelSettings/savePrizes.js';

import getPrizes from '../controller/spinWheelSettings/getPrizes.js';

import setWinnerPrize from '../controller/winnerPrize/setWinnerPrize.js';

import getWinnerPrize from '../controller/winnerPrize/getWinnerPrize.js';


// //-----------------------------------------REQUEST HANDELING--------------------------------------------


router.get("/", (req, res) => {
    res.send("app is working...")
});

router.post("/contactUs", contactUsHandler);

router.post("/saveMail", upload.single('image'), saveMail);

router.get("/listContacts", listContacts);

router.get("/getEncryptionKey", getEncryptionKey);

router.post("/sendBulkMail", bulkMail);

router.post("/saveCustomerDescription", saveCustomerDescription);

router.post("/spinWheelSettings/savePrizes", savePrizes);

router.get("/spinWheelSettings/getPrizes", getPrizes);

router.post("/setWinnerPrize", setWinnerPrize);

router.get("/getWinnerPrize/:iv", getWinnerPrize);



