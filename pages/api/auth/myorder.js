// pages/api/order/addMultiple.js
import db from "../../../utils/db";
import nc from "next-connect";
import MyOrder from "../../../models/MyOrder";

const handler = nc();

handler.post(async (req, res) => {
  try {
    console.log("Request body:", req.body);  // Log pentru datele primite în cerere

    await db.connect_Db();
    console.log("Connected to database");

    const { email, products, paymentMethod, status = "active" } = req.body;

    // Verificăm datele primite
    if (!email || !Array.isArray(products) || products.length === 0 || !paymentMethod) {
      console.log("Invalid data received:", { email, products, paymentMethod });
      return res.status(400).json({ message: "Invalid data" });
    }

    // Căutăm dacă există un order pentru acest email
    let myOrder = await MyOrder.findOne({ email });
    console.log("Found myOrder:", myOrder);

    if (!myOrder) {
      // Dacă nu există, creăm unul nou
      myOrder = new MyOrder({
        email,
        carts: [],
      });
      console.log("Creating new order for email:", email);
    }

    // Creăm un nou coș
    const newCart = {
      cartId: new Date().getTime().toString(), // Folosim un timestamp pentru a crea un ID unic
      totalPrice: 0,
      totalProducts: 0,
      status,
      products: [],
    };

    // Adăugăm produsele în coș
    products.forEach(product => {
      const { productId, title, author, price, imageUrl, quantity, discount } = product;
      
      console.log("Processing product:", product);

      const existingProductIndex = newCart.products.findIndex(item => item.productId.toString() === productId);

      if (existingProductIndex > -1) {
        // Dacă produsul există deja, actualizăm cantitatea
        newCart.products[existingProductIndex].quantity += quantity;
        console.log("Updated existing product quantity:", newCart.products[existingProductIndex]);
      } else {
        // Dacă nu există, adăugăm un produs nou
        newCart.products.push({
          productId,
          title,
          author,
          price,
          quantity,
          imageUrl,
          discount,
        });
        console.log("Added new product:", product);
      }
    });

    // Calculăm totalPrice și totalProducts pentru acest coș
    newCart.totalPrice = newCart.products.reduce((total, product) => total + ((product.price-(product.price/100*product.discount)).toFixed(2) * product.quantity), 0);
    newCart.totalProducts = newCart.products.reduce((total, product) => total + product.quantity, 0);
    console.log("New cart totalPrice:", newCart.totalPrice);
    console.log("New cart totalProducts:", newCart.totalProducts);

    // Adăugăm noul coș în array-ul de coșuri al comenzii
    myOrder.carts.push(newCart);

    // Salvăm modificările
    await myOrder.save();
    console.log("Order saved successfully:", myOrder);

    res.status(200).json({
      message: "New cart added successfully",
      cart: newCart,
      status: newCart.status,
      paymentMethod: myOrder.paymentMethod,
    });
  } catch (error) {
    console.error("Error occurred:", error);  // Log pentru eroare
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await db.disconnect_DB();
    console.log("Disconnected from database");
  }
});

export default handler;
