const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: {
            data: Buffer,
            contentType: String
        },
        document: {
            data: Buffer,
            contentType: String,
            fileName: String
        },
        description: String,
        linkAccess: String,
        linkInstruct: String,
        managingUnit: String,
        contactPoint: String
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const System = mongoose.model('system', systemSchema);

module.exports = System;

