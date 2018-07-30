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
    Article.find({}, data => {
        console.log(data);
        res.render("index", {test: data});
    });
}

export const renderTopic = (req, res, topic) => {
    res.send("oiiii " + topic);
    
}

// Routes used in backend for various calls
br.get("/backend/test", (req, res) => {
    res.send("Backend stuff");
});

br.post("/api/create", (req, res) => {
    db.Note.insert(req.body, (data) => {
        res.json(data);
    });
});

br.delete("/api/delete/:id", (req, res) => {
    db.Note.destroy()
});

br.get("/api/scrape", (req, res) => {

})

export default backendRoutes;