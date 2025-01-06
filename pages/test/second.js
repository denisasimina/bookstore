// // Cart.js

// import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { removeItemFromCart } from '../redux/cartSlice'; // Importă acțiunea de eliminare

// const Cart = () => {
//   const cart = useSelector((state) => state.cart); // Accesează starea coșului din Redux
//   const dispatch = useDispatch(); // Folosește dispatch pentru a trimite acțiuni

//   const handleRemoveFromCart = (productId) => {
//     // Elimină produsul din coș
//     dispatch(removeItemFromCart(productId));
//   };

//   return (
//     <div>
//       <h2>Coșul tău</h2>
//       {cart.items.length === 0 ? (
//         <p>Coșul este gol.</p>
//       ) : (
//         <div>
//           <ul>
//             {cart.items.map((item) => (
//               <li key={item.productId}>
//                 {item.title} - Cantitate: {item.quantity} - Preț: {item.total} lei
//                 <button onClick={() => handleRemoveFromCart(item.productId)}>Șterge</button>
//               </li>
//             ))}
//           </ul>
//           <h3>Total: {cart.totalPrice} lei</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
