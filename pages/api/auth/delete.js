import nc from 'next-connect'; // next-connect pentru endpoint-uri flexibile
import db from '../../../utils/db'; // Conexiunea la baza de date
import Cart from '../../../models/Cart';
import { ObjectId } from 'mongodb'; // Importă ObjectId din MongoDB

const handler = nc(); // Creează un handler cu next-connect

// Handler pentru metoda DELETE
handler.delete(async (req, res) => {
  await db.connect_Db(); // Conectează-te la baza de date

  const { user, productId } = req.body; // Extrage user și productId din body-ul requestului

  try {
    // Convertește productId într-un ObjectId
    const productObjectId = new ObjectId(productId);

    // Găsește coșul utilizatorului
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Elimină produsul cu _id-ul respectiv din items
    const updatedItems = cart.items.filter(item => !item._id.equals(productObjectId));

    // Recalculează totalQuantity
    const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

    // Actualizează coșul
    cart.items = updatedItems;
    cart.totalQuantity = totalQuantity;

    // Salvează modificările
    await cart.save();

    res.status(200).json({ message: 'Book removed successfully', updatedCart: cart });
  } catch (error) {
    console.error('Error removing book:', error);
    res.status(500).json({ message: 'Error removing book' });
  } finally {
    await db.disconnect_Db(); // Închide conexiunea la baza de date
  }
});

export default handler; // Exportă handler-ul pentru a fi folosit de Next.js
