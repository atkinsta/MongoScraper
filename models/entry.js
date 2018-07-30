const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: {
        type: String,
        required = true,
        unique = true
    },
    content: {
        type: String
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref= "Note"
    }
});

const Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;