import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist " });
    }

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ message: "internal server error " });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, userExist.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "password is invalid" });
    }

    const tokenExist = req.cookies.token;
    if (tokenExist) {
      return res.status(400).json({ message: "Already Login" });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: "login successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const logout = async (req, res) => {
  try {
    const tokenExist = req.cookies.token;
    if (!tokenExist) {
      return res.status(400).json({ message: "login required" });
    }

    res.clearCookie("token");
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(400).json({ message: "user does not exist" });
    }

    if (req.body.pssword) {
      const salt = await bcrypt.genSalt(10);
      const hashedpwd = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedpwd;
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


