import nc from 'next-connect';
import db from '../../../utils/db';
import Cart from '../../../models/Cart';

const handler = nc();

// Endpoint PUT pentru actualizarea cantității unui produs din coș
handler.put(async (req, res) => {
  await db.connect_Db(); // Conectează-te la baza de date

  const { user, productId, action } = req.body; // Extrage datele din cerere
  console.log(user, "jjjjjjjjjjjjjjj");
  console.log(productId, "Ddddddddddddddddd");
  console.log(action, "hhhhhhhhhhhhhhhhhhhhh");

  try {
    // Găsește coșul utilizatorului
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Găsește produsul din coș
    const product = cart.items.find(item => item.productId.toString() === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Incrementăm sau decrementăm cantitatea în funcție de acțiune
    if (action === 'increment') {
      product.quantity += 1;  // Incrementăm cantitatea
    } else if (action === 'decrement') {
      if (product.quantity > 1) {  // Previne decrementarea sub 1
        product.quantity -= 1;  // Decrementăm cantitatea
      }
    }

    // Salvăm coșul actualizat în baza de date
    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
});

export default handler;
