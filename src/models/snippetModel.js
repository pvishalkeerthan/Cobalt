import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    title:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    },
    src:{
        type:String,
        default:"Local"
    },
    tags: {
        type: [String], 
        default:[]
    },
    description:{
        type:String,
    }
})

const Snippet = mongoose.models.snippets || mongoose.model("snippets",snippetSchema);

export default Snippet;