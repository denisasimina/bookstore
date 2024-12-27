import mongoose from 'mongoose';


const {ObjectId}=mongoose.Schema;



const subSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[2,'must be at least 2 caacth'],
       maxlength:[32,'must be at least 32 caacth'],
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    parent:
    {
        type:ObjectId,
        ref:"Category",
        required:true,
    },
})


const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;