const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//*Schema
const registerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
});

const Users = mongoose.model("users", registerSchema);

const findUserByEmail = (email) => Users.findOne({ email });
const findUserByPassword = () => Users.findOne({ password });

const createNewUser = (userData) => {
    const newUser = new Users(userData);
    return newUser.save();
};

//* update password by id
const updatePasswordById = (id, password) => {
    Users.findByIdAndUpdate(id, { password });
};

module.exports = {
    findUserByEmail,
    createNewUser,
    findUserByPassword,
    updatePasswordById,
};