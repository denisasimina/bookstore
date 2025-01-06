import mongoose from 'mongoose';
import Cart from '../../../models/Cart';

const addMissingQuantityField = async () => {
  await mongoose.connect('mongodb://localhost:27017/<database_name>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Actualizează toate documentele existente
    await Cart.updateMany(
      { 'items.quantity': { $exists: false } }, // Selectează documentele fără `quantity`
      { $set: { 'items.$[].quantity': 1 } } // Adaugă câmpul `quantity` cu valoarea implicită
    );
    console.log('Câmpul quantity a fost adăugat cu succes.');
  } catch (error) {
    console.error('Eroare la actualizarea documentelor:', error);
  } finally {
    await mongoose.disconnect();
  }
};

addMissingQuantityField();
