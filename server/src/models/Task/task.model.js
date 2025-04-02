
import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
        unique: true
    },

    taskStatus: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Completed']
    },

    taskDescription: {
        type: String,
    },

    taskPriority: {
        type: Number,
        required: true,
        min: 1,
    },

    taskDuration: {
        type: Number,
        required: true,
        min: 1,
    },

    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan"
    }

}, {
    timestamps: true
}); 


export const Task = mongoose.model('Task', taskSchema);