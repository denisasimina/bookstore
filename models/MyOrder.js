const mongoose = require('mongoose');
const { Schema } = mongoose;

const myOrderSchema = new Schema(
  {
    email: { type: String, required: true },
    carts: [
      {
        cartId: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        totalProducts: { type: Number, required: true },
        status: {
          type: String,
          required: true,
          enum: ['active', 'completed', 'abandoned'],
        },
        createdAt: { type: Date, default: Date.now }, // Adăugat timpul de creare
        products: [
          {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            author: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            imageUrl: { type: String, required: false },
            discount: { type: String, required: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

delete mongoose.connection.models['MyOrder'];
const MyOrder = mongoose.model('MyOrder', myOrderSchema);
export default MyOrder;