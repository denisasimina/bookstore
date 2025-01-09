import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/signin.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Formik, Form } from "formik";
import LoginInput from "../components/inputs";
import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import * as Yup from "yup";
import AnyBtn from "../components/buttons/anyBtn";
import Router from "next/router";

import { getSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import Forgot from "./auth/forgot";



const initialValues = {
  login_email: "",
  login_password: "",
  login_error: "",
};




export default function Signin({ providers,callbackUrl,csrfToken }) {
  console.log('Providers:', providers);
  console.log("GITHUB_ID:", process.env.GITHUB_ID);
  console.log("GOOGLE_ID:", process.env.GOOGLE_ID);
  console.log("TWITTER_ID:", process.env.TWITTER_ID);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, login_error } = user;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };




  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email."),
    login_password: Yup.string()
      .required("Please enter a password."),
  });





  const signInHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);



    const options = {
      redirect: false,
      email: values.login_email,
      password: values.login_password,
    };





    const res = await signIn("credentials", options);



    setLoading(false);
    setSubmitting(false);


    if (res.error) {
      setUser((prevUser) => ({ ...prevUser, login_error: res.error }));
    }
   else {
      Router.push(callbackUrl ||  "/");
    }
  };






  return (
    <>
      <Header />


      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
         
         
           </div>
            <div className={styles.login__form}>
            <h1>Sign in</h1>



            <Formik
               enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}
              onSubmit={signInHandler}



            >
              {({ errors, touched, isSubmitting }) => (
                <Form method="post" 
                action ="api/auth/signin/email">
                  
                 <input type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}/>


                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />



                  <div className={styles.buttons}>
                    <AnyBtn type="submit" text={isSubmitting ? "Signing in..." : "Sign in"} />
                    <Link href="/signup" passHref>
                      <AnyBtn type="button" text="Sign up" />
                    </Link>
                  </div>


                  {login_error && <span style={{ color: "red" }}>{login_error}</span>}
                </Form>
              )}
            </Formik>




            <div className={styles.forget}>
              <Link href={"/auth/forgot"}>
                <p>Click here if you forgot your password</p>
              </Link>
            </div>



            <div className={styles.login_socials}>
              <div className={styles.or}> Or continue with </div>
              {providers.map((provider) => {
                if(provider.name=="Credentials"){
                  return;
                }
                return(
                  <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                      <img src={`/icons/${provider.name}.png`} alt={`${provider.name} icon`} />
                     {provider.name}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}






export async function getServerSideProps(context) {

  const { req, query } = context;
 const session = await getSession({ req });
 const callbackUrl = query.callbackUrl || "/";



  
if (session) {
    return {
      redirect: {
        destination: callbackUrl,  
        permanent: false,
      },
    };
  }



  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { 
      providers: providers ? Object.values(providers) : [], 
      csrfToken, 
      callbackUrl 
    },
  };
}