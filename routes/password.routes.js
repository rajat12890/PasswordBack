import express from "express";
import { createPassword,deletePassword,updatePassword } from "../controllers/password.controller.js";


const passwordRouter=express.Router()
passwordRouter.route("/addPassword").post(createPassword);


passwordRouter.route("/deletePassword/:id").post(deletePassword);

passwordRouter.route('/updatePassword/:id').put(updatePassword);

export{passwordRouter}
