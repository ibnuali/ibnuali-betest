const catchAsync = require('../middlewares/catchAsync')
const Account = require('../models/Account')
const User = require('../models/User')
const factory = require('./handlerFactory')

exports.getUserByAccountNumber = catchAsync(async (req, res, next) => {
    const accountNumber = req.params.accountNumber
    const doc = await User.find({ accountNumber: accountNumber })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    })
})

exports.getUserByRegistrationNumber = catchAsync(async (req, res, next) => {
    const registrationNumber = req.params.registrationNumber
    const doc = await User.find({ registrationNumber: registrationNumber })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    })
})

exports.getUser = catchAsync(async (req, res) => {
    try {
        const { id } = req.params
        const cachedUser = await req.redis.get(`redis_ibnuali_betest:${id}`)
        if (cachedUser) {
            return res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedUser),
            })
        }

        const doc = await User.findById(id)

        await req.redis.set(`redis_ibnuali_betest:${id}`, JSON.stringify(doc))
        res.status(200).json({
            status: 'success',
            data: doc,
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'failed to get user',
        })
    }
})

exports.getUser = catchAsync(async (req, res) => {
    try {
        const { id } = req.params
        const cachedUser = await req.redis.get(`redis_ibnuali_betest:${id}`)
        if (cachedUser) {
            return res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedUser),
            })
        }

        const doc = await User.findById(id)

        await req.redis.set(`redis_ibnuali_betest:${id}`, JSON.stringify(doc))
        res.status(200).json({
            status: 'success',
            data: doc,
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'failed to get user',
        })
    }
})

exports.createUser = catchAsync(async (req, res, next) => {
    try {
        const { userName, password } = req.body

        const doc = await User.create({
            fullName: req.body.fullName,
            emailAddress: req.body.email,
            accountNumber: req.body.accountNumber,
            registrationNumber: req.body.registrationNumber,
        })

        await Account.create({
            userName: userName,
            password: password,
            lastLoginDateTime: Date.now(),
            userId: doc._id,
        })

        await req.redis.set(
            `redis_ibnuali_betest:${doc.userId}`,
            JSON.stringify(doc)
        )

        res.status(201).json({
            status: 'success',
            data: doc,
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'failed to create user',
        })
    }
})

exports.getAllUsers = catchAsync(async (req, res) => {
    try {
        const cachedUser = await req.redis.get(`redis_ibnuali_betest_allusers`)
        if (cachedUser) {
            return res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedUser),
            })
        }

        const doc = await User.find()
        await req.redis.set(
            `redis_ibnuali_betest_allusers`,
            JSON.stringify(doc)
        )

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'failed to get user',
        })
    }
})

// exports.getAllUsers = factory.getAll(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
