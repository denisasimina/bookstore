import db from "../../../utils/db";
import User from "../../../models/User";
import nc from "next-connect";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connect_Db();

    const { email, name, phone, address, city, state, zip, country, payment, delivery } = req.body;

    console.log(req.body, "Request data");

    // Validate required fields
    if (!email || !name || !phone || !address || !city || !state || !zip || !country || !payment || !delivery) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Replace the first address (or create a new one if the list is empty)
    if (user.address && user.address.length > 0) {
      user.address[0] = {
        firstName: name,
        phoneNumber: phone,
        address1: address,
        city,
        zipCode: zip,
        state,
        country,
      };
    } else {
      user.address = [
        {
          firstName: name,
          phoneNumber: phone,
          address1: address,
          city,
          zipCode: zip,
          state,
          country,
        },
      ];
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Address replaced successfully", address: user.address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnect_Db();
  }
});

export default handler;
