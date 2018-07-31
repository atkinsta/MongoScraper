import mongoose from "mongoose";
import express from "express";
import Article from "../models/article";
import Note from "../models/note";
import cheerio from "cheerio";
import request from "request";

const backendRoutes = express.Router();
const br = backendRoutes;

// Functions to be used to render our pug files
export const renderAll = (req, res) => {
    Article.find({}).populate("notes").exec((err, data) => {
        if (data.length)
            res.render("index", {articles: data});
        else
            scrapeData(() => {
                res.redirect("/");
            });
    });
}

export const renderTopic = (req, res, topic) => {
    //render topics pages here

}

const scrapeData = (callback) => {
    request("https://www.reuters.com/news/archive/scienceNews", (err, response, body) => {
        if (err)
            throw err;
        const $ = cheerio.load(body);

        $(".story-content").each((i, item) => {
            console.log(item);
            let title = $(item).children("a").children("h3").text();
            let link = "https://www.reuters.com" + $(item).children("a").attr("href");
            let context = $(item).children("p").text();
            let result = {
                title: title,
                link: link,
                context: context 
            }

            console.log(result);
            Article.create(result).then(storedArticle => {
                console.log(storedArticle);
            }).catch(err => console.log(err));
        });
        callback();
    });
}

const loadArticles = () => {
    Article.find({}).populate("notes", (err, data) => {
        if (err)
            throw err;
        return data;
    });
}

// Routes used in backend for various calls
br.post("/api/note/:id", (req, res) => {
    console.log(req.params.id);
    Note.create(req.body).then(newNote => 
        Article.findOneAndUpdate({ _id: req.params.id }, {$push: {notes: newNote._id}}, { new: true })
    ).then(updatedArticle => {
        res.json(updatedArticle);
    });
});

br.delete("/api/delete/:id", (req, res) => {
    Note.findByIdAndRemove(req.params.id).then(data => {
        res.json(data)
    });
});

br.get("/api/scrape", (req, res) => {
    scrapeData(() => {
        res.redirect("/");
    })
});

br.get("/api/articles", (req, res) => {
    Article.find({}).populate("notes").exec((err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});

export default backendRoutes;