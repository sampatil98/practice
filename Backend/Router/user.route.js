const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");

const UserRouter = express.Router();

// register Route

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(201)
        .json({ isError: true, msg: "User already registerd" });
    }

    let hashpassword = bcrypt.hashSync(password, 5);

    let newUser = new UserModel({ name, email, password: hashpassword });

    await newUser.save();

    res
      .status(200)
      .json({ isError: false, msg: "User registerd successfully!", newUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// login Route

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(201)
        .json({ isError: true, msg: "Please register first" });
    }

    let passcheck = bcrypt.compareSync(password, user.password);

    if (!passcheck) {
      return res.status(201).json({ isError: true, msg: "Wrong Credential" });
    }

    let payload = { UserId: user._id, email: user.email };

    let token = jwt.sign(payload, process.env.SecreteKey, { expiresIn: "8h" });

    res
      .status(200)
      .json({
        isError: false,
        msg: "User login successful!",
        token: token,
        user: user,
      });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { UserRouter };
