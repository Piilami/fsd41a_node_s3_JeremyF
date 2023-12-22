import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = (req, res, next) => {
  const validEmail = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    "gm"
  );
  const validUsername = new RegExp(/^.*(?=.{8,}).*$/, "gm");
  const validPassword = new RegExp(/^.*(?=.{8,}).*$/, "gm");

  if (
    validPassword.test(req.body.password) === true &&
    validEmail.test(req.body.email) === true &&
    validUsername.test(req.body.username)
  ) {
    bcrypt
      .hash(req.body.password, 10)
      .then((result) => {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: result,
        });

        user
          .save()
          .then(() =>
            res.status(201).json({ message: "Utilisateur créé avec succès" })
          )
          .catch((err) => {
            console.error(err);
            res.status(500).json({ err });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err });
      });
  } else {
    res.status(400).json({ message: "informations incorrects" });
  }
};

const login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((pswd) => {
          if (pswd) {
            const token = jwtoken.sign(
              {
                username: user.username,
                isAdmin: user.isAdmin,
              },
              process.env.SECRET_TOKEN,
              { expiresIn: "1h" }
            );

            user.token = token;

            user.save().then(() => {
              res.cookie("token", token, { httpOnly: true });
              res.status(200).json({
                username: user.username,
                token: token,
              });
            });
          } else {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
        });
      } else {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Erreur lors de l'authentification" + err })
    );
};

export default {
  login,
  register,
};
