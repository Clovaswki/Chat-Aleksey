const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EvaluationSchema = Schema({
    userId: {
        type: String
    },
    comment: {
        type: String
    },
    questionOneLikeOrNot:{
        type: Boolean
    },
    questionTwo: {
        type: String
    }
}, {timestamps: true})

var EvaluationModel = mongoose.model('evaluations', EvaluationSchema)

module.exports = EvaluationModel