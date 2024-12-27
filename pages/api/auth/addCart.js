import db from "../../../utils/db";
import Cart from "../../../models/Cart";
import nc from 'next-connect';

const handler = nc();

handler.post(async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    await db.connect_Db();

    const { user, id, title, author, price, discount, category_name, image, quantity } = req.body;

    // Verifică dacă toate câmpurile necesare sunt prezente
    if (!id || !title || !author || !price || !discount || !category_name || !image || !user || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ user });

    if (!cart) {
      // Creare coș nou
      cart = new Cart({
        user,
        items: [
          {
            productId: id,
            title,
            author,
            price,
            discount,
            category_name: category_name.toString(),
            image,
            quantity,
          },
        ],
      });
    } else {
      // Verifică dacă produsul există deja
      const existingProductIndex = cart.items.findIndex(item => item.productId.toString() === id);

      if (existingProductIndex > -1) {
        // Actualizează cantitatea produsului existent
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        // Adaugă un produs nou
        cart.items.push({
          productId: id,
          title,
          author,
          price,
          discount,
          category_name: category_name.toString(),
          image,
          quantity: quantity || 1,
        });
      }
    }

    // Salvează coșul și actualizează automat totalQuantity
    console.log("Saving cart with items:", cart.items);
    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      items: cart.items,
      totalQuantity: cart.totalQuantity, // Trimite și totalQuantity ca răspuns
    });
  } catch (error) {
    console.error("Error while adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await db.disconnect_DB();
  }
});

export default handler;
