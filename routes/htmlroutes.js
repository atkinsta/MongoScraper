import express from "express";
import {renderAll, renderTopic} from "./backendroutes.js";
const htmlRouter = express.Router();

htmlRouter.get("/", (req, res) => {
    renderAll(req, res)
});

htmlRouter.get("/topic/:topic", (req, res) => {
    renderTopic(req, res, req.params.topic)
});

export default htmlRouter;