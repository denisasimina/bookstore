import mongoose from "mongoose";

// Definirea unei singure scheme pentru comenzile utilizatorului
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Identificatorul utilizatorului
    purchases: [
      {
        products: [
          {
            name: { type: String, required: true }, // Numele produsului
            quantity: { type: Number, required: true }, // Cantitatea
            price: { type: Number, required: true }, // Prețul produsului
          },
        ],
        shippingDetails: {
          name: { type: String, required: true },
          phone: { type: String, required: true },
          address: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          zip: { type: String, required: true },
          country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true }, // Metoda de plată (ex: cash, card)
        deliveryMethod: { type: String, required: true }, // Metoda de livrare
        totalAmount: { type: Number, required: true }, // Total de plată
        status: { type: String, default: "Pending" }, // Statusul comenzii
        orderDate: { type: Date, default: Date.now }, // Data comenzii
      },
    ],
  },
  {
    timestamps: true, // Înregistrează când a fost creat și actualizat documentul
  }
);

// Exportă modelul
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
