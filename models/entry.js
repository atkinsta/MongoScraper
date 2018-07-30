import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    notes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Notes"
        }
    ]
});

const Entry = mongoose.model("Entry", EntrySchema);

export default Entry;