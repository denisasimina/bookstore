import  mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;


const reviewSchema = new mongoose.Schema({
  rewiewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
  },
  size: {
    type: String,
  },
  style: {
    color: String,
    image: String,
  },
  fit: {
    type: String,
  },

  images: [],
  likes: [],
});

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    edit:{
        type:String,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
   
    category: {
        type: ObjectId,
      required: true,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "subCategory",
      },
    ],

    details: [{ name: String, value: String }],

    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    rewiews: [reviewSchema],

    refundPolicy: [{ type: String, default: "30days" }],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    subProducts: [
      {
        images: [],
        description_image: [],
        color: {
          color: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        sizes: [
          {
            size: String,
            qty: Number,
            price: Number,
          },
        ],
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

