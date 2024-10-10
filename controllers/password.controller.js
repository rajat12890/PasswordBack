import mongoose from "mongoose";
import { Password } from "../models/password.model.js";
import { catchayncerror } from "../middlewares/catchasyncerror.js";
import { User } from "../models/user.model.js";
// import moment from "moment";

const createPassword = catchayncerror(async (req, res, next) => {
  const {
    
      pass,
    category,
    username,
    userId,
  } = req.body;

 

  if ( !pass || !category||!username)  {
    return res.status(408).json({
      success: false,
      messages: "Please Fill all fields",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  let newPassword = await Password.create({
    
   
    category: category,
   pass:pass,
    username: username,
    user: userId,
  
  });

  user.passwordArray.push(newPassword);

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password Added Successfully",
    user,
  });
});
const deletePassword = catchayncerror(async (req, res, next) => {
  const passwordId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const passwordElement = await Password.findByIdAndDelete(passwordId);
  // console.log(passwordElement._id);
  if (!passwordElement) {
    return res.status(400).json({
      success: false,
      message: "Password not found",
    });
  }

  user.passwordArray= user.passwordArray.filter(
    (items) => !items._id.equals(passwordElement._id)
  );
  // user.updateOne({password:})
  // console.log(temp);
  await user.save();
  // console.log(user.password);

  return res.status(200).json({
    success: true,
    message: `Password successfully deleted`,
    user,
  });
});



const updatePassword = catchayncerror(async (req, res, next) => {
  const passwordId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const {  pass,  category,username } =
    req.body;

  const passwordElement = await Password.findById(passwordId);

  if (!passwordElement) {
    return res.status(400).json({
      success: false,
      message: "Password not found",
      user,
    });
  }

  

  if (pass) {
    passwordElement.pass =pass;
  }

 
  if (username) {
    passwordElement.username =username;
  }
  if (category) {
    passwordElement.category = category;
  }
 
  await passwordElement.save();

  const index = user.passwordArray.findIndex((password) =>
    password._id.equals(passwordId)
  );
  // console.log(index);
  if (index !== -1) {
    user.passwordArray[index] = passwordElement;
    // console.log(user.password[index]);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: `Password Updated Successfully`,
    user,
  });
});

export { createPassword, deletePassword, updatePassword };
