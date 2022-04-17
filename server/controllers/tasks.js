import mongoose from "mongoose";
import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        
        res.json(tasks).status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    const { name } = req.body;

    const newTask = { name };
    try {
        const task = await new Task(newTask).save();

        res.status(201).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { _id, name, status } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({error: `No post with id: ${_id}`});
        }

        const updatedTask = { name, status };
        await Task.findByIdAndUpdate(_id, updatedTask);

        res.sendStatus(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { _id } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({error: `No post with id: ${_id}`});
        }

        const deletedTask = { _id };
        await Task.findByIdAndDelete(_id, deletedTask);

        res.sendStatus(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
