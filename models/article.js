import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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

const Article = mongoose.model("Entry", ArticleSchema);

export default Article;