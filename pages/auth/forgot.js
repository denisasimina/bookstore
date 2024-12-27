import { useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Formik, Form } from "formik";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../../styles/signin.module.scss";
import * as Yup from "yup";
import LoginInput from "../../components/inputs";
import AnyBtn from "../../components/buttons/anyBtn";
import DotLoader from "../../loaders";
import axios from "axios";  
import { Router } from "next/router";
import { useRouter } from "next/router";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");


 


const router=useRouter();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };


  
  const forgotValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email"),
  });


  
  const forgotHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });

      setSucces(data.message);

      setTimeout(() => {
      router.push("/signin");
      }, 3000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }


   
  };




  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header />

      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <FaArrowLeft />
            </div>
            <span>Forgotten password</span>
          </div>

          <div className={styles.login__form}>
            <h1>Recover your password</h1>

            <Formik
              enableReinitialize
              initialValues={{ email }}
              validationSchema={forgotValidation}
              onSubmit={forgotHandler} 
            >
              {({ errors, touched }) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email address"
                    value={email} 
                    onChange={handleChange} 
                  />
                  
                  {errors.email && touched.email && (
                    <div className="error">{errors.email}</div>
                  )}

                  <div className={styles.buttons}>
                  
                    <AnyBtn type="submit" text="Reset" />
                  </div>

                  {error && <span style={{ color: "red" }}>{error}</span>}
                  {succes && <span style={{ color: "green" }}>{succes}</span>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
