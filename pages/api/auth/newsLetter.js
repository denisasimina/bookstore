import nc from "next-connect";
import { sendNewsletter } from "../../../utils/sendEmails"; // Importă funcția de trimitere a newsletterului
import { validateEmail } from "../../../utils/validation"; // Validare simplă a emailului

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { email } = req.body;

    // Validare simplă a emailului
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Adresa de e-mail nu este validă." });
    }

    // Trimite emailul de confirmare pentru abonare la newsletter
    await sendNewsletter(email);

    // Răspunde utilizatorului că abonarea a fost completată
    res.status(200).json({ message: "Te-ai abonat cu succes la newsletter. Verifică-ți inbox-ul pentru confirmare." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
