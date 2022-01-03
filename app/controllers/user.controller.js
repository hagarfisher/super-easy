const db = require("../models");
const User = db.users;
const List = db.lists;


module.exports.createUser = async function (user) {
    try {
        newUser = await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        console.log(">> Created User: " + JSON.stringify(newUser, null, 4));
        return newUser;
    } catch (err) {
        console.log(">> Error while creating user: ", err);
    }
};