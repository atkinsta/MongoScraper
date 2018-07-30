import mongoose from "mongoose";
import express from "express";

const backendRoutes = express.Router();

// Functions to be used to render our pug files
export const renderAll = (req, res) => {
    res.send("hello!");
}

export const renderTopic = (req, res, topic) => {
    res.send("oiiii " + topic);
    
}

// Routes used in backend for various calls
backendRoutes.get("/backend/test", (req, res) => {
    res.send("Backend stuff");
})

export default backendRoutes;