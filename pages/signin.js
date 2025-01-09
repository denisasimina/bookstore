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
  console.log("Environment Variables:");
  console.log("MONGODB_URL:", process.env.MONGODB_URL || "Not defined");
  console.log("JWT_SECRET:", process.env.JWT_SECRET || "Not defined");
  console.log("NEXT_URL:", process.env.NEXT_URL || "Not defined");
  console.log("BASE_URL:", process.env.BASE_URL || "Not defined");
  console.log("GITHUB_ID:", process.env.GITHUB_ID || "Not defined");
  console.log("GITHUB_SECRET:", process.env.GITHUB_SECRET || "Not defined");
  console.log("GOOGLE_ID:", process.env.GOOGLE_ID || "Not defined");
  console.log("GOOGLE_SECRET:", process.env.GOOGLE_SECRET || "Not defined");
  console.log("TWITTER_ID:", process.env.TWITTER_ID || "Not defined");
  console.log("TWITTER_SECRET:", process.env.TWITTER_SECRET || "Not defined");
  console.log("T_ID:", process.env.T_ID || "Not defined");
  console.log("T_SECRET:", process.env.T_SECRET || "Not defined");
  console.log("AUTH0_CLIENT_ID:", process.env.AUTH0_CLIENT_ID || "Not defined");
  console.log("AUTH0_CLIENT_SECRET:", process.env.AUTH0_CLIENT_SECRET || "Not defined");
  console.log("AUTH0_ISSUER:", process.env.AUTH0_ISSUER || "Not defined");
  console.log("ACTIVATION_TOKEN_SECRET:", process.env.ACTIVATION_TOKEN_SECRET || "Not defined");
  console.log("RESET_TOKEN_SECRET:", process.env.RESET_TOKEN_SECRET || "Not defined");
  console.log("MAILING_SERVICE_CLIENT_ID:", process.env.MAILING_SERVICE_CLIENT_ID || "Not defined");
  console.log("MAILING_SERVICE_CLIENT_SECRET:", process.env.MAILING_SERVICE_CLIENT_SECRET || "Not defined");
  console.log("MAILING_SERVICE_CLIENT_REFRESH_TOKEN:", process.env.MAILING_SERVICE_CLIENT_REFRESH_TOKEN || "Not defined");
  console.log("SENDER_EMAIL_ADDRESS:", process.env.SENDER_EMAIL_ADDRESS || "Not defined");
  
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