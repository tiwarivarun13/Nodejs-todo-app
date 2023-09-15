import { Task } from "../models/task.js";
import  ErrorHandler  from "../middlewares/error.js";

export const newTask= async(req, res, next)=>{
    try {
        const {title,description} = req.body;
     await Task.create({
        title,
        description,
        user: req.user
    })
    res.status(201).json({
        success: true,
        message:"Task added successfully"
    })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async(req, res) =>{
    try {
        const userid= req.user._id

    const tasks = await Task.find({user:userid})
    if(!tasks) return next(new ErrorHandler("Task Not Found",404));

    res.status(200).json({
        success:true,
        tasks
    })
    } catch (error) {
        next(error)
    }

}

export const updateTask = async(req, res) =>{
    try {
        const{id}=req.params;

    const tasks = await Task.findById(id);
    if(!tasks) return next(new ErrorHandler("Task Not Found",404));

    tasks.isCompleted = !tasks.isCompleted

    tasks.save();

    res.status(200).json({
        success:true,
        message:"Task updated"
    })
    } catch (error) {
        next(error);
    }

}
export const deleteTask = async(req, res,next) =>{
    try {
        const{id}=req.params;

    const tasks = await Task.findById(id);
    if(!tasks) return next(new ErrorHandler("Task Not Found",404));
    tasks.deleteOne();

    res.status(200).json({
        success:true,
        message:"Task deleted"
    })

    } catch (error) {
        next(error);
    }
}