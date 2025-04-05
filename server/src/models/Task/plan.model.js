
import mongoose, { Schema } from 'mongoose';

const planSchema = new mongoose.Schema({

    planTitle: {
        type: String,
        required: true,
        unique: true
    },

    planDescription: {
        type: String,
    },

    planStatus: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Completed']
    },

    planDuration: {
        type: Number,
        required: true,
        min: 1,
    },

    planStartDate: {
        type: Date,
        // required: true
    },

    planEndDate: {
        type: Date,
        // required: true
    },
    
    planPriority: {
        type: Number,
        required: true,
        min: 1,
    },

    planType: {
        type: String,
        required: true,
        enum: ['Weekly', 'Monthly', 'Freestyle'],
    },

    planEffort: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },

    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },


}, {
    timestamps: true
}); 


export const Plan = mongoose.model('Plan', planSchema); 