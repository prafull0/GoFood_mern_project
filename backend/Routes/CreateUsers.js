const express = require("express")

const router = express.Router()
require('dotenv').config()
const User = require("../models/Users")
const { useFormState } = require("react-dom")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const jwtSecrets = process.env.Secrets

router.post("/createuser", [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('name').isLength({ min: 5 }),
  body('password', "incorrect password").isLength({ min: 5 })]

  ,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try {
      User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      })
      res.json({ success: true })
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  })

router.post("/loginuser", [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password', "incorrect password").isLength({ min: 5 })],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    let email = req.body.email;


    try {
      let userData = await User.findOne({ email })
      if (!userData) {
        return res.status(400).json({ error: "Try logging with correct credentials" })
      }
    const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ error: "Try logging with correct credentials" })
      }

      const data = {
        user:{
          id:userData.id
        }
    }
    const authToken = jwt.sign(data,jwtSecrets)

      return res.json({ success: true ,authToken:authToken})
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  })
module.exports = router;