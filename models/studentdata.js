const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        Required:true,
        type:String,
    },
    rollNo:{
        Required:true,
        type:String,
    },
    department:{
        Required:true,
        type:String,
    },
    
    password:{
        Required:true,
        type:String,
    },
    role:{
        default:'Student',
        type:String,
    },
    attendance_day:{
        default: 0,
        type:Number,
    },
    attendance_hour:{
        default: 0,
        type:Number,
    },
    semester:{
        default: 0,
        type:Number,
    },
    year:{
        default: 0,
        type:Number,
    },
    batch:{
        default: 2021,
        type:Number,
    },
    role:{
        default:'Student',
        type:String,
    },
    subject_1:{
        default: 0,
        type:Number,
    },
    subject_2:{
        default: 0,
        type:Number,
    },
    subject_3:{
        default: 0,
        type:Number,
    },
    subject_4:{
        default: 0,
        type:Number,
    },
    subject_5:{
        default: 0,
        type:Number,
    },
    exam_name:{
        default:'',
        Required:true,
        type:String,
    },
    total_assignment:{
        default: 0,
        type:Number,
    },
    
    Completed_assignment:{
        default: 0,
        type:Number,
    },
})

const User = mongoose.model("students",UserSchema)

module.exports = User;