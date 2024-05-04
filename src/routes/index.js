import express from 'express';
export const router = express.Router();

// // requiring authorization middleware
// const authorizeUserLogin = require("../middleware/authorization/authorizeUserLogin");
// const authorizeRootUser = require("../middleware/authorization/authorizeRootUser");
// const authorizeLevelOneUser = require("../middleware/authorization/authorizeLevelOneUser");


// import { contactUsHandler } from "../controller/contactUs/contactUs";
// import contactUs from "../controller/contactUs/contactUs.js";
import contactUsHandler from '../controller/contactUs/contactUs.js';


// //importing Product controllers
// const addProduct = require("../controller/product/addProduct");
// //importing Tax controllers
// const addTax = require("../controller/tax/addTax");
// const displayTax = require("../controller/tax/displayTax");



// // authorizing the user
// router.use(authorizeUserLogin);
// router.use(authorizeLevelOneUser);

// //-----------------------------------------REQUEST HANDELING--------------------------------------------

// //routing for Product details
// router.post("/addProduct", addProduct);

// //routing for Staff details
// router.post("/addStaff", authorizeRootUser, addStaff);


// //routing for tax details
// router.post("/addTax", addTax);
// router.get("/displayTax", displayTax);

router.get("/", (req, res) => {
    res.send("app is working...")
});

// router.post("/contactUs", contactUs);


//exporting router
// module.exports = router;
// export default router;
