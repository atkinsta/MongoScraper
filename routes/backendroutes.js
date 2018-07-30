import mongoose from "mongoose";
import express from "express";
import db from "../models/index.js";

const backendRoutes = express.Router();
const br = backendRoutes;

// Functions to be used to render our pug files
export const renderAll = (req, res) => {
    db.Entry.findAll({}, data => {
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

export default backendRoutes;