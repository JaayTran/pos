import Users from "../models/userModel.js";
import CryptoJS from "crypto-js";

//get users
export const getUsersController = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

//for login
export const loginController = async (req, res) => {
  try {
    const { loginNumber, password } = req.body;
    const user = await Users.findOne({ loginNumber });
    if (!user) {
      res.status(401).json("Wrong username!");
      return;
    }

    // Decrypt the user's stored password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Compare the decrypted password with the input password
    if (decryptedPassword !== password) {
      res.status(401).json("Wrong password!");
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

//for register
export const registerController = async (req, res) => {
  try {
    const { name, loginNumber, password } = req.body;

    // Encrypt the password using CryptoJS
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();

    const newUser = new Users({
      name,
      loginNumber,
      password: encryptedPassword,
      verified: true,
    });
    await newUser.save();
    res.status(200).send("New User Added Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
export const updateUserController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // If the password is provided in the request, encrypt it before updating the user
    if (password) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC
      ).toString();
      req.body.password = encryptedPassword;
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: userId },
      req.body,
      {
        new: true,
      }
    );

    // If the password was updated, decrypt it before sending the response
    if (password) {
      const bytes = CryptoJS.AES.decrypt(
        updatedUser.password,
        process.env.PASS_SEC
      );
      updatedUser.password = bytes.toString(CryptoJS.enc.Utf8);
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
export const deleteUserController = async (req, res) => {
  try {
    await Users.findOneAndDelete({ _id: req.body.userId });
    res.status(200).json("User Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
