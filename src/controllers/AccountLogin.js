const Account = require('../models/Account');
const User = require('../models/User');
const factory = require('./handlerFactory');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
