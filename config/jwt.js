const jwt = require("jsonwebtoken");

const genToken = (payload, expDate = "30d") => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.jwt, { expiresIn: expDate }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.jwt, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
};
module.exports = { genToken, verifyToken };