const catchAsync = require('../middlewares/catchAsync')
const Account = require('../models/Account')
const User = require('../models/User')
const factory = require('./baseController')

exports.getUserByAccountNumber = catchAsync(async (req, res, next) => {
    const accountNumber = req.params.accountNumber
    const doc = await User.findOne({ accountNumber: accountNumber })

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
    const doc = await User.findOne({ registrationNumber: registrationNumber })

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

exports.deleteUser = catchAsync(async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Account.findOneAndDelete({ userId: req.params.id })

        await req.redis.del(`redis_ibnuali_betest:${req.params.id}`)
        await req.redis.del(`redis_ibnuali_betest_allusers`)

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
})

exports.updateUser = catchAsync(async (req, res, next) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that ID',
            })
        }

        await req.redis.set(
            `redis_ibnuali_betest:${req.params.id}`,
            JSON.stringify(doc)
        )
        await req.redis.del(`redis_ibnuali_betest_allusers`)

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
})
