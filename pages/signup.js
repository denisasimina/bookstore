import { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import LoginInput from "../components/inputs";
import { useState } from "react";
import { getProviders } from "next-auth/react";
import * as Yup from "yup";
import AnyBtn from "../components/buttons/anyBtn";
import Axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import DotLoader from "../loaders";

import Router from "next/router";

const initialValues = {
 
  full_name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};




export default function Signup({ providers }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {  email, password, conf_password, full_name, success, error } = user;




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };




  const registerValidation = Yup.object({
    full_name: Yup.string()
      .required("What is your name?")
      .min(2, "Your name must be between 2 and 16 characters")
      .max(16, "Your name must be between 2 and 16 characters")
      .matches(/^[a-zA-Z\s]*$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Please enter a password")
      .min(6, "Password must have between 6 and 30 characters")
      .max(30, "Password must have between 6 and 30 characters")
      .matches(/[0-9]/, "Password must contain at least one number") 
      .matches(/[\W_]/, "Password must contain at least one special character") ,
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
      
  });





  const signUpHandler = async () => {
    try {
      setLoading(true);

      const { data } = await Axios.post("/api/auth/signup", {
        name: full_name, 
        email,
        password,
      });



      
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);

      setTimeout(()=>{
        Router.push("/")
      },2500)

    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };





  return (
    <>

    {loading && <DotLoader loading={loading}/>}
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
       
            <span>We are happy to join us</span>
          </div>

          <div className={styles.login__form}>
            <h1>Sign up</h1>





            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
                conf_password,
                full_name,
              }}
              validationSchema={registerValidation}
              onSubmit={signUpHandler}
            >
              {/* {(form) => ( */}
                <Form>
                  <LoginInput
                    type="text"
                    name="full_name"
                    icon="user"
                    placeholder="Full name"
                    onChange={handleChange}
                   
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Retype the password"
                    onChange={handleChange}
                  />

                  <div className={styles.buttons}>
                    <AnyBtn type="submit" text="Sign up" />
                  </div>
                </Form>
              {/* )} */}
            </Formik>
            <div>{error && <div style={styles.er}>Error: {error}</div>}</div>
            <div>{success && <div style={styles.er}>Success: {success}</div>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const providers = Object.values(await getProviders());
//   return {
//     props: { providers },
//   };
// }
