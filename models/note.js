const mongoose = require("mongoose");

const Schema = mongoose.Schema

var NoteSchema = new Schema ({
    content: {
        type: String
    }
});