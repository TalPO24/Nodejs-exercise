const express = require("express");
const app = require("../../app");
const router = express.Router();
const bizcardRouter = require("./bizcard");
const animalcardRouter = require("./animalcard");
const productcardRouter = require("./productcard");
const authRouter = require("./auth");

//* http://localhost:3033/newuser -- endpoint

router.get("/newuser", (req, res) => {
    res.json({ msg: "ok" });
});

router.use("/bizcards", bizcardRouter);
router.use("/animalcards", animalcardRouter);
router.use("/productcards", productcardRouter);
router.use("/auth", authRouter);

module.exports = router;