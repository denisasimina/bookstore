import mongoose from 'mongoose';

const {ObjectId}=new mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
     type: String, 
    required: true,

minlength:[2,"at least 2 character"],
maxlength:[32,"at least 22 character"],
},

  slug: { 
    type: String, 
    required: true, 
    unique: true,
lowercase:true,
index:true, },
  
},


{
    timestamps:true,
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
