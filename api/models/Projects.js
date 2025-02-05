const mongoose = require('mongoose');

// schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    clientId: {
        type: 'ObjectId',
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
toObject: {
        virtuals: true,
    }
});

projectSchema.virtual('client', {
    ref: 'Client',
    localField: 'clientId',
    foreignField: '_id',
    justOne: true,
});

const Project = mongoose.model('Project', projectSchema);

// model
module.exports = {
    Project, projectSchema,
}