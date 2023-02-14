const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Schema
const bizcardsSchema = new Schema({
    bizName: { type: String, required: true },
    bizDescription: { type: String },
    bizAddress: { type: String, required: true },
    bizPhone: { type: String, required: true },
    bizImg: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: "users" },
});

//* mongoose.model : 1) create collection ,  2)connect collection to Schema
const Bizcards = mongoose.model("bizcards", bizcardsSchema);

const createNewBizCard = (
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImg,
    ownerId
) => {
    const bizcard = new Bizcards({
        bizName,
        bizDescription,
        bizAddress,
        bizPhone,
        bizImg,
        ownerId,
    });
    return bizcard.save();
};

const showAllBizCards = () => {
    return Bizcards.find({});
};

const showBizCarsById = (id) => {
    return Bizcards.findById(id);
};

const updateBizcardById = (
    id,
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImg
) => {
    return Bizcards.findByIdAndUpdate(id, {
        bizName,
        bizDescription,
        bizAddress,
        bizPhone,
        bizImg,
    });
};

const deleteBizCardById = (id) => {
    return Bizcards.findByIdAndDelete(id);
};

module.exports = {
    createNewBizCard,
    showAllBizCards,
    showBizCarsById,
    updateBizcardById,
    deleteBizCardById,
};