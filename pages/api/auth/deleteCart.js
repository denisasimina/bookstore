import Cart from "../../../models/Cart";
import db from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metoda nu este permisă. Folosiți POST." });
  }

  console.log(req.body, "Request body");

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email-ul este necesar." });
  }

  try {
    await db.connect_Db(); // Conectează-te la baza de date

    // Golește toate cărucioarele asociate cu utilizatorul
    const updatedCarts = await Cart.updateMany(
      { user: email }, // Găsește toate cărucioarele utilizatorului
      { $set: { items: [], totalQuantity: 0 } }, // Golește items și setează totalQuantity la 0
      { new: true } // Opțional: dacă dorești să returnezi documentele actualizate
    );

    if (updatedCarts.matchedCount === 0) {
      return res.status(404).json({ message: "Nu s-au găsit cărucioare pentru utilizatorul specificat." });
    }

    res.status(200).json({
      message: "Toate cărucioarele au fost golite cu succes.",
      updatedCount: updatedCarts.modifiedCount,
    });
  } catch (error) {
    console.error("Eroare la golirea cărucioarelor:", error.message);
    res.status(500).json({ message: "A apărut o eroare la procesarea cererii. Încercați din nou mai târziu." });
  } finally {
    await db.disconnect_DB(); // Închide conexiunea
  }
}
