import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },

},{_id:false});

const availabilitySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
        index:true,
    },
    dayofWeek:{
        type:Number,
        required:true,
        min:0,
        max:6,
    },
    slots:{
        type:[slotSchema],
        default:[],
    },

},{timestamps:true});

availabilitySchema.index({userId:1,dayofWeek:1},{unique:true});
const Availability = mongoose.model("Availability" , availabilitySchema);
export default Availability;