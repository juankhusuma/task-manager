import { NextFunction, Request, Response } from "express";

export function validateTaskCreate(req: Request, res: Response, next: NextFunction) {
    const { title, description, due } = req.body;
    if (req.method !== "POST") return next();
    if (!title || !description || !due) {
        res.status(400).json({
            message: "Title, description and due date are required"
        })
        return;
    }

    if (due && isNaN(new Date(due).getTime())) {
        res.status(400).json({
            message: "Due date must be a valid date"
        })
        return;
    }

    if (Date.now() > new Date(due).getTime()) {
        res.status(400).json({
            message: "Due date must be a future date"
        })
        return;
    }

    if (title.length < 10) {
        res.status(400).json({
            message: "Title must atleast be 10 characters long"
        })
        return;
    }
    req.body = { title, description, due: new Date(due) }
    next();
}

export function validateTaskUpdate(req: Request, res: Response, next: NextFunction) {
    const { title, description, due, done } = req.body;
    if (req.method !== "PUT") return next();
    if (due && isNaN(new Date(due).getTime())) {
        res.status(400).json({
            message: "Due date must be a valid date"
        })
        return;
    }

    if (Date.now() > new Date(due).getTime()) {
        res.status(400).json({
            message: "Due date must be a future date"
        })
        return;
    }

    if (title && title.length < 10) {
        res.status(400).json({
            message: "Title must atleast be 10 characters long"
        })
        return;
    }
    req.body = { title, description, due: new Date(due), done }
    next();
}
