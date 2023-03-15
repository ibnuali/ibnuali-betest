const catchAsync = require('../middlewares/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
    })

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    })

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body)
        if (!doc) {
            return next(new AppError('failed to create document', 400))
        }
        res.status(201).json({
            status: 'success',
            data: doc,
        })
    })

exports.getOne = (Model) =>
    catchAsync(async (req, res) => {
      try{
        const { id } = req.params

        const doc = await Model.findById(id)

        res.status(200).json({
            status: 'success',
            data: doc,
        })
      }
      catch(err){
        res.status(400).json({
            status: 'error',
            message: "Failed to get document"
        })
      }
       
    })

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Model.find(), req.query).paginate()
        // const doc = await Model.find();
        const doc = await features.query

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: doc,
        })
    })
