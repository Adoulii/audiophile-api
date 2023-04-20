import bodyParser from "body-parser";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
export default class AuthController {
  static async register(req, res, next) {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      if (!(firstname && lastname && email && password)) {
        res.status(400).send("All input is required");
      }
      user = new User({
        firstname,
        lastname,
        email,
        password,
      });
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save().then((user) => {
        res.status(200).json({
          message: "User successfully created",
          user,
        });
      });
      res.status(201).json({ message: "User Created!" });
    } catch (error) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      });
      console.log(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body);
    if (!(email && password)) {
      res.status(400).send("All input are required");
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            const expireTime = 3 * 60 * 60;
            const token = Jwt.sign(
              { user_id: user._id, email },
              process.env.SECRET_KEY,
              { expiresIn: expireTime }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: expireTime * 1000,
            });
            res.status(200).json({
              message: "Login successful",
              token,
            });
          } else {
            res.status(400).json({ message: "Login not succesful" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  }
  static async getAccesToken(req, res, next) {
    const token = req.cookies["jwt"];
    if (token == null) {
      return res.sendStatus(401);
    }
   Jwt.verify(
      token,
      process.env.SECRET_KEY,
      async (err, userr) => {
        if (err) {
          return res.sendStatus(403);
        }
        let user = await User.findById(userr.user_id);
        const data = {
          firstname: user.firstname,
          lastname: user.lastname,
          accessToken: token,
        };
        res.status(200).json({ success: true, user: data });
        next();
      }
    );
  }
  static async logout(req, res, next) {
    try {
      res.cookie('jwt', '', {
        httpOnly: true,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
