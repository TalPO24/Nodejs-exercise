const express = require("express");
const router = express.Router();

const {
    validateNewBizSchema,
    validateUpdateBizSchema,
    validateDeleteBizSchema,
    validateFindBizCardByIdSchema,
} = require("../../validation/biz.validation");
const {
    createNewBizCard,
    showAllBizCards,
    showBizCarsById,
    updateBizcardById,
    deleteBizCardById,
} = require("../../models/bizcards.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowAccessMiddleware = require("../../middleware/allowModifey.middelaware");

//* /api/bizcards
router.get("/", async(req, res) => {
    try {
        const allBizCards = await showAllBizCards();
        res.json({ allBizCards });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//* api/bizcard/getbyid/123231123 == params
router.get("/getbyid/:id", async(req, res) => {
    try {
        const findById = await validateFindBizCardByIdSchema(req.params);
        const bizcardData = await showBizCarsById(findById.id);
        res.json(bizcardData);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.post("/", authMiddleware, async(req, res) => {
    try {
        const validatedValue = await validateNewBizSchema(req.body);
        const userData = await createNewBizCard(
            validatedValue.bizName,
            validatedValue.bizDescription,
            validatedValue.bizAddress,
            validatedValue.bizPhone,
            validatedValue.bizImg,
            req.userData.id
        );
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json({ error: err });
        console.log(err);
    }
});

//* /api/bizcards - update
router.patch("/", authMiddleware, allowAccessMiddleware, async(req, res) => {
    try {
        const validatedValue = await validateUpdateBizSchema(req.body);
        const bizCardData = await showBizCarsById(validatedValue.id);
        if (!bizCardData) throw "card not found";
        if (bizCardData.ownerId === req.userData.id || req.userData.allowAccess) {
            await updateBizcardById(
                validatedValue.id,
                validatedValue.bizName,
                validatedValue.bizDescription,
                validatedValue.bizAddress,
                validatedValue.bizPhone,
                validatedValue.bizImg
            );
        } else {
            throw "invalid operation";
        }
        res.status(201).json({ msg: "user updated" });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//* /api/bizcards - delete
router.delete(
    "/:id",
    authMiddleware,
    allowAccessMiddleware,
    async(req, res) => {
        try {
            const validatedValue = await validateDeleteBizSchema(req.params);
            const bizCardData = await showBizCarsById(validatedValue.id);
            if (!bizCardData) throw "card not found";
            if (bizCardData.ownerId === req.userData.id || req.userData.allowAccess) {
                const bizCardDataAfterDelete = await deleteBizCardById(
                    validatedValue.id
                );
                res.status(201).json(bizCardDataAfterDelete);
            } else {
                throw "invalid operation";
            }
            res.status(201).json(userData);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }
);

module.exports = router;