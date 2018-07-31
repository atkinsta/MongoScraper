import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    context: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    notes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Note"
        }
    ]
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;