import express from "express";
import { Prisma } from "@prisma/client"
import { db } from "../db";

export const taskRouter = express.Router();
taskRouter.get("/", async (_, res) => {
    const data = await db.task.findMany();
    res.status(200).json(data)
})
taskRouter.get("/:id", async (req, res) => {
    const id = +req.params.id;
    const data = await db.task.findUnique({
        where: { id }
    });
    if (!data) {
        res.status(404).json({ message: "Not found" })
        return
    }
    res.status(200).json(data)
})
taskRouter.post("/", async (req, res) => {
    const data = await db.task.create({
        data: { ...req.body }
    });
    res.status(201).json(data)
})
taskRouter.put("/:id", async (req, res) => {
    const id = +req.params.id;
    const task = await db.task.findUnique({
        where: { id }
    });
    if (!task) {
        res.status(404).json({ message: "Not found" })
        return
    }
    const data = await db.task.update({
        where: { id },
        data: { ...req.body }
    });
    res.status(200).json(data)
})
taskRouter.delete("/:id", async (req, res) => {
    const id = +req.params.id;
    const task = await db.task.findUnique({
        where: { id }
    });
    if (!task) {
        res.status(404).json({ message: "Not found" })
        return
    }
    const data = await db.task.delete({
        where: { id }
    });
    res.status(200).json(data)

})