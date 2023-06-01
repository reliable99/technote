const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tittle: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: true
    }, 
    
    
},
    {
        timestamps: true,
    }
)
noteSchema.plugin(AutoIncrement, {
    inc_fields: 'ticket',
    id: "ticketNums",
    start_seq: 500
})


module.exports = mongoose.model('Note', noteSchema)