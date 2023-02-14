const express = require("express");
const router = express.Router();

const {
    validateNewProductSchema,
    validateUpdateProductSchema,
    validateDeleteProductSchema,
} = require("../../validation/product.validation");

const {
    createNewProductCard,
    updateNewProductCard,
    deleteProductCard,
    showAllProductCards,
} = require("../../models/productcard.model");

//* read
router.get("/", async(req, res) => {
    try {
        const allProductCards = await showAllProductCards();
        res.status(201).json({ allProductCards });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//* create
router.post("/", async(req, res) => {
    try {
        const validatedValue = await validateNewProductSchema(req.body);
        const userData = await createNewProductCard(
            validatedValue.productName,
            validatedValue.productPrice,
            validatedValue.productStock
        );

        res.status(201).json(userData);
    } catch (err) {
        res.status(401).json(err);
    }
});

//* update
router.patch("/", async(req, res) => {
    try {
        const validatedValue = await validateUpdateProductSchema(req.body);
        const userData = await updateNewProductCard(
            validatedValue.id,
            validatedValue.productName,
            validatedValue.producrPrice,
            validatedValue.productStock
        );
        res.status(201).json({ msg: "card updated" });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//* delete
router.delete("/:id", async(req, res) => {
    try {
        const validatedValue = await validateDeleteProductSchema(req.params);
        const userData = await deleteProductCard(validatedValue.id);
        res.status(201).json(userData);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

module.exports = router;