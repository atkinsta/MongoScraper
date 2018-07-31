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
    Article.find({}).populate("notes", (err, data) => {
        if (data.length)
            res.render("index", {articles: data});
        else
            scrapeData(() => {
                res.redirect("/");
            });
    });
}

export const renderTopic = (req, res, topic) => {
    res.send("oiiii " + topic);

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

const loadArticles = (callback) => {
    Article.find({}).populate("notes", (err, data) => {
        if (err)
            throw err;
        callback(data);
    });
}

// Routes used in backend for various calls
br.post("/api/note/:id", (req, res) => {
    db.Note.create(req.body).then(newNote => 
        db.Article.findOneAndUpdate({ _id: req.params.id }, { note: newNote._id }, { new: true })
    ).then(updatedArticle => {
        res.json(updatedArticle);
    });
});

br.delete("/api/delete/:id", (req, res) => {
    db.Note.destroy()
});

br.get("/api/scrape", scrapeData, loadArticles);

export default backendRoutes;