const express = require("express");
const router = express.Router();

const {
    validateRegisterSchema,
    validateLoginSchema,
    validateForgotPasswordSchema,
} = require("../../validation/auth.validation");

const {
    findUserByEmail,
    createNewUser,
    updatePasswordById,
} = require("../../models/users.model");

const { createHash, compareHash } = require("../../config/bcrypt");

const { genToken, verifyToken } = require("../../config/jwt");
const validate = require("../../validation/validate");

//* register
router.post("/register", async(req, res) => {
    try {
        const validatedValue = await validateRegisterSchema(req.body);
        const user = await findUserByEmail(validatedValue.email);
        if (user) {
            throw "email already exists";
        }
        const hashedPassword = await createHash(validatedValue.password);
        validatedValue.password = hashedPassword;
        await createNewUser(validatedValue);
        res.status(201).json({ msg: "user created" });
    } catch (error) {
        global.logger.warn({
            method: req.method,
            error: error.massage,
            url: req.originalUrl,
            body: req.body,
        });
        res.status(400).json(error);
    }
});

//* login
router.post("/login", async(req, res) => {
    try {
        const validatedValue = await validateLoginSchema(req.body);
        const user = await findUserByEmail(validatedValue.email);
        if (!user) {
            throw " invalid email/password";
        }
        const isEqual = await compareHash(validatedValue.password, user.password);
        if (!isEqual) {
            throw "invalid email/password";
        }
        const token = await genToken({
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
        });
        res.json({ token });
    } catch (error) {
        global.logger.warn({
            method: req.method,
            error: error.massage,
            url: req.originalUrl,
            body: req.body,
        });
        res.status(400).json(error);
    }
});

//* forgot password
router.post("/forgotpassword", async(req, res) => {
    try {
        const validatedValue = await validateForgotPasswordSchema(req.body);
        const userData = await findUserByEmail(validatedValue.email);
        if (!userData) throw "check your inbox";
        const jwt = await genToken({ email: userData.email }, "1h");
        // send email or sms
        console.log("http://localhost:3000/resetpassword/" + jwt);
        res.json({ msg: "check your inbox" });
    } catch (err) {
        res.json({ msg: err });
    }
});

//* reset password
router.post("/resetpassword:token", async(req, res) => {
    try {
        // add joi for password
        const payload = await verifyToken(req.params.token);
        const userData = await findUserByEmail(payload.email);
        if (!userData) throw " somthing went wrong";
        const hashedPassword = await createHash(req.body.password);
        updatePasswordById(userData._id, hashedPassword);
        res.json({ msg: "password updated" });
    } catch (err) {
        res.status(400).json({ err });
    }
});

module.exports = router;