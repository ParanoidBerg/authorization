const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userController = {
  createUser: async (req, res) => {
    try {
      const hash = await bcrypt.hash(
        req.body.password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const data = await User.create({
        login: req.body.login,
        password: hash,
      });
      res.json(data);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  },
  delUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("User was deleted");
    } catch (err) {
      res.json(err);
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  logIn: async (req, res) => {
    try {
      const candidate = await User.findOne({ login: req.body.login });
      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин" });
      }
      const valid = await bcrypt.compare(req.body.password, candidate.password);
      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
      };
      const token = await jwt.sign(payload, process.env.KEY, {
        expiresIn: "24h",
      });

      res.json({ token });
    } catch (err) {
      res.json(err);
    }
  },
};
