import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      category_name: { type: String, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalQuantity: { type: Number, default: 0 }, // Adăugat câmpul totalQuantity
});

// Middleware pentru actualizarea automată a totalQuantity
cartSchema.pre('save', function (next) {
  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
  next();
});

delete mongoose.connection.models['Cart'];
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
