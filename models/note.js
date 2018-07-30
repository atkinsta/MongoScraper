import mongoose from "mongoose"
const Schema = mongoose.Schema

const NoteSchema = new Schema ({
    content: {
        type: String
    }
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;