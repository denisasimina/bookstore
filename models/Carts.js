// import mongoose from 'mongoose';

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: String,
//     required: true,
//   },
//   items: [
//     {
//       productId: {
//         type: String,
//         required: true, 
//       },
//       title: { 
//         type: String, 
//         required: true 
//       },
//       author: { 
//         type: String, 
//         required: true 
//       },
//       price: { 
//         type: Number, 
//         required: true 
//       },
//       quantity: { 
//         type: Number, 
//         default: 1 
//       },  // cantitatea trebuie să aibă valoare de 1 ca default
//     },
//   ],
// });

// const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

// export default Cart;