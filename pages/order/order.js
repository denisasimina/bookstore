import { useState } from "react";
import styles from "./styles.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LoginInput from "../../components/inputs";
import { Formik, Form } from "formik";
import { courier } from "../../data/home";
import { getNames } from "country-list";
import * as Yup from "yup";
import Axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";  // Folosim `useSession` pentru a obține sesiunea curentă
import axios from "axios";
import Cart from "../../models/Cart";
import { getSession } from "next-auth/react";
import db from "../../utils/db";

const initialValues = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  payment: "",
  delivery: "",
};
// const products = [
//     {
//       productId: "1",
//       title: "Book 1",
//       author: "Author 1",
//       price: 20,
//       image: "image_url_1",
//       quantity: 1
//     },
//     {
//         productId: "2",
//       title: "Book 2",
//       author: "Author 2",
//       price: 25,
//       image: "image_url_2",
//       quantity: 2
//     }
//   ];
  

  const paymentMethod = "credit_card";  // Exemplu de metodă de plată
  

export default function Order({carts}) {
  const [loading, setLoading] = useState(false);
  const countries = getNames();
  const { data: session } = useSession();  // Obținem sesiunea curentă a utilizatorului
  const router=useRouter();
  console.log(carts)


  const products = carts.flatMap(cart =>
    cart.items.map(item => ({
      productId: item.productId,
      title: item.title,
      author: item.author,
      price: item.price,
      imageUrl: item.image,
      quantity: item.quantity,
      discount:item.discount
     
    }))
  );
  
  console.log(products)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const signUpHandler = async (values) => {
  try {
    setLoading(true);

    if (!session || !session.user || !session.user.email) {
      return alert("Please log in to proceed.");
    }

    console.log("Session email:", session.user.email);
    console.log("Form Values:", values);

    // Cererile necesare
    const request1 = Axios.put("/api/auth/order", {
      email: session.user.email,
      ...values, // Adăugăm toate valorile din formular
    });

    const request2 = Axios.post("/api/auth/myorder", {
      email: session.user.email,
      products: products,
      paymentMethod: paymentMethod,
    });

    const request3 = Axios.post("/api/auth/deleteCart", {
      email: session.user.email,

    });

    // Așteaptă toate cererile să fie finalizate
    const [response1, response2, response3] = await Promise.all([
      request1,
      request2,
      request3,
    ]);

    console.log("Responses:", response1.data, response2.data, response3.data);

    setLoading(false);
    router.push("/myOrders/myOrder");
  } catch (error) {
    setLoading(false);
    console.error("Error:", error.response?.data?.message || error.message);
    alert("An error occurred while processing your order. Please try again.");
  }
};


  const orderValidation = Yup.object({
    name: Yup.string().required("What is your name?"),
    phone: Yup.string()
      .matches(/^\d{7,15}$/, "Phone number must be between 7 and 15 digits")
      .required("Please enter a phone number"),
    address: Yup.string().required("Please enter your address"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    zip: Yup.string()
      .matches(/^\d{4,10}$/, "ZIP Code must be between 4 and 10 digits")
      .required("Please enter your ZIP code"),
    country: Yup.string().required("Please select your country"),
    payment: Yup.string().required("Please select a payment method"),
    delivery: Yup.string().required("Please select a courier"),
  });

  return (
    <>
      <Header />
      <div className={styles.order}>
        <div className={styles.container}>
          <h1>Shipping and Payment Information Form</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={orderValidation}
            onSubmit={signUpHandler}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {/* Personal Details */}
                <div className={styles.PersonalDetails}>
                  <h3>Personal Details</h3>
                  <div className={styles.row}>
                    <LoginInput
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                    <LoginInput
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={values.phone}
                      onChange={(e) => setFieldValue("phone", e.target.value)}
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className={styles.ShippingAddress}>
                  <h3>Shipping Address</h3>
                  <div className={styles.row}>
                    <LoginInput
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={values.address}
                      onChange={(e) => setFieldValue("address", e.target.value)}
                    />
                    <LoginInput
                      type="text"
                      name="city"
                      placeholder="City"
                      value={values.city}
                      onChange={(e) => setFieldValue("city", e.target.value)}
                    />
                  </div>
                  <div className={styles.row}>
                    <LoginInput
                      type="text"
                      name="state"
                      placeholder="State/Province/Region"
                      value={values.state}
                      onChange={(e) => setFieldValue("state", e.target.value)}
                    />
                    <LoginInput
                      type="text"
                      name="zip"
                      placeholder="ZIP/Postal Code"
                      value={values.zip}
                      onChange={(e) => setFieldValue("zip", e.target.value)}
                    />
                  </div>

                  <div className={styles.country}>
                    <select
                      name="country"
                      value={values.country}
                      onChange={(e) => setFieldValue("country", e.target.value)}
                    >
                      <option value="">Country...</option>
                      {countries.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Payment Details */}
                <div className={styles.PaymentDetails}>
                  <h3>Payment Details</h3>
                  <div>
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="cash"
                      checked={values.payment === "cash"}
                      onChange={(e) => setFieldValue("payment", e.target.value)}
                    />
                    <label htmlFor="cash">Cash on courier</label>
                  </div>
                </div>

                {/* Courier Selection */}
                <div className={styles.courier}>
                  <h3>Choose the courier</h3>
                  {courier.map((item, index) => (
                    <div className={styles.option} key={index}>
                      <input
                        type="radio"
                        id={`courier-${index}`}
                        name="delivery"
                        value={item.text}
                        checked={values.delivery === item.text}
                        onChange={(e) => setFieldValue("delivery", e.target.value)}
                      />
                      <label htmlFor={`courier-${index}`}>{item.text}</label>
                      <img src={item.image} alt={item.text} />
                    </div>
                  ))}
                </div>

                {/* Confirm Order */}
                <div className={styles.button}>
                  <button
                    className={styles.btn_universal}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: "/signin",
              permanent: false,
          },
      };
  }
    await db.connect_Db();
  
    const carts = await Cart.find({ user: session.user.email }).lean();;
   
  
    return {
      props: {
        carts: JSON.parse(JSON.stringify(carts)),
       
      },
    };
  }
  