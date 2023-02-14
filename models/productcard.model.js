const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Schema
const productcardSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productStock: { type: Number, required: true },
});

const Productcards = mongoose.model("productcards", productcardSchema);

const createNewProductCard = (productName, productPrice, productStock) => {
    const productcard = new Productcards({
        productName,
        productPrice,
        productStock,
    });
    return productcard.save();
};

const showAllProductCards = () => {
    return Productcards.find({});
};

const showProductCarsById = (id) => {
    return Productcards.findById(id);
};

const updateNewProductCard = (id, productName, productPrice, productStock) => {
    return Productcards.findByIdAndUpdate(id, {
        productName,
        productPrice,
        productStock,
    });
};

const deleteProductCard = (id) => {
    return Productcards.findByIdAndDelete(id);
};

module.exports = {
    createNewProductCard,
    updateNewProductCard,
    deleteProductCard,
    showAllProductCards,
    showProductCarsById,
};