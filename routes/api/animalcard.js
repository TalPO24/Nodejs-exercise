const express = require("express");
const router = express.Router();

const { validateNewAnimalSchema } = require("../../validation/biz.validation");
const {
    validateUpdateAnimalSchema,
    validateDeleteAnimalSchema,
    validateAnimalRegisterSchema,
    validateAnimalLoginSchema,
} = require("../../validation/animal.validation");
const {
    createNewAnimalCard,
    updateAnimalcardById,
    deleteAnimalCardById,
    findAnimalUserByEmail,
    createNewAnimalUser,
} = require("../../models/animalcards.model");

// const { findUserByEmail, createNewUser } = require("../../models/users.model");

const { createHash, compareHash } = require("../../config/bcrypt");

const { genToken } = require("../../config/jwt");

const animalArr = ["dog", "fish", "kangoroo"];
router.get("/", (req, res) => {
    res.json({ msg: animalArr });
});

// router.get("/1", (req, res) => {
//     res.json({ msg: "dog" });
// });

// router.get("/2", (req, res) => {
//     res.json({ msg: "fish" });
// });

//* qparams
router.get("/qparams", (req, res) => {
    console.log({ animal: animalArr[req.query.index] });
});

//* params
// router.get("/:id", (req, res) => {
//     res.json({ animal: animalArr[req.params.id] });
// });

router.post("/", async(req, res) => {
    try {
        const validatedValue = await validateNewAnimalSchema(req.body);
        const userData = await createNewAnimalCard(
            validatedValue.animalName,
            validatedValue.animalRace
        );
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.put("/", async(req, res) => {
    try {
        const validatedValue = await validateUpdateAnimalSchema(req.body);
        const userData = await updateAnimalcardById(
            validatedValue.id,
            validatedValue.animalName,
            validatedValue.animalRace
        );
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const validatedValue = await validateDeleteAnimalSchema(req.params);
        const userData = await deleteAnimalCardById(validatedValue.id);
        res.status(201).json({ msg: "card deleted" });
    } catch (err) {
        res.status(401).json(err);
    }
});

router.post("/register", async(req, res) => {
    try {
        const validatedValue = await validateAnimalRegisterSchema(req.body);
        const user = await findAnimalUserByEmail(validatedValue.email);
        if (user) {
            throw "email already exists";
        }
        const hashedPassword = await createHash(validatedValue.password);
        validatedValue.password = hashedPassword;
        await createNewAnimalUser(validatedValue);
        res.status(201).json({ msg: "user created" });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async(req, res) => {
    try {
        const validatedValue = await validateAnimalLoginSchema(req.body);
        const animalUser = await findAnimalUserByEmail(validatedValue.email);
        if (!animalUser) {
            throw " invalid email/password";
        }
        const token = await genToken({
            email: animalUser.email,
            id: animalUser._id,
            race: animalUser.race,
        });
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;