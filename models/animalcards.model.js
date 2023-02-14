const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Schema
const animalcardsSchema = new Schema({
    animalName: { type: String, required: true },
    animalRace: { type: String, required: true },
    // we need to add owner id
});

const animalRegisterSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    race: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const Animalcards = mongoose.model("animalcards", animalcardsSchema);

const AnimalUsers = mongoose.model("animalusersregister", animalRegisterSchema);

const findAnimalUserByEmail = (email) => AnimalUsers.findOne({ email });
const findAnimalUserByPassword = () => Users.findOne({ password });

const createNewAnimalUser = (userData) => {
    const newAnimalUser = new AnimalUsers(userData);
    return newAnimalUser.save();
};

const createNewAnimalCard = (animalName, animalRace) => {
    const animalcard = new Animalcards({
        animalName,
        animalRace,
    });
    return animalcard.save();
};

const updateAnimalcardById = (id, animalName, animalRace) => {
    return Animalcards.findByIdAndUpdate(id, {
        animalName,
        animalRace,
    });
};

const deleteAnimalCardById = (id) => {
    return Animalcards.findByIdAndDelete(id);
};

module.exports = {
    createNewAnimalCard,
    updateAnimalcardById,
    deleteAnimalCardById,
    findAnimalUserByEmail,
    createNewAnimalUser,
    findAnimalUserByPassword,
};