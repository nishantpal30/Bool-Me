import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
            index:true,
        },
        amount:{
            type:Number,
            requires:true,
            min:1,
        },
        currency:{
            type:String,
            default:"inr",
        },
        status:{
            type:String,
            enum:["pending","processing","paid","rejected"],
            default:"pending",
            index:true,
        },
        payoutSnapshot:{
            accountHolderName:String,
            bankname:String,
            accountLast4:String,
            ifsc:String,
            upiId:String,
        },
        adminNote:{
            type:String,
            default:" ",
            trim:true,
        },
    },{timestamps:true}
);

const Withdrawal = mongoose.model("Withdrawal",withdrawalSchema);
export default Withdrawal;