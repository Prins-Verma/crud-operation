const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
    user_id: { type: String, required: true},
    username: { type: String, required: true},
    mobile: { type: String, required: true},
    email: { type: String, required: true },
    description: { type: String },
    process_id: { type: String },
    deletedBy: { type: String },
    deleteDate: { type: String },
    createdBy: { type: String },
    createdOn: { type: String },
},{ timestamps: true, collection: "user"})

module.exports = mongoose.model("user", CustomerSchema)



