import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/signin.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import LoginInput from "../../../components/inputs";
import AnyBtn from "../../../components/buttons/anyBtn";
import Link from "next/link";

// Schema de validare pentru resetare parolă
const validationSchema = Yup.object({
  password: Yup.string()
    .required("Please enter a password")
    .min(6, "Password must have between 6 and 30 characters")
    .max(30, "Password must have between 6 and 30 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
  conf_password: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function ResetPasswordPage({ user_id }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(""); // Ștergem starea de eroare redundantă
  const router = useRouter();

  const resetPassword = async (values) => {
    setLoading(true);
    try {
      const { password } = values;

      // Cererea pentru actualizarea parolei utilizatorului
      await axios.put("/api/auth/reset", {
        user_id,
        password,
      });

      setSuccess("Password reset successfully!");  // Mesaj de succes
      setError(""); // Resetăm eroarea după succes
      setLoading(false);
      router.push("/"); // Redirecționare către pagina de login după resetare
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");  // Erorile de la server
    }
  };

  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <Link href="/auth/signin">
              <div className={styles.back__svg}>
                <FaArrowLeft />
              </div>
            </Link>
            <span>Forgotten Password</span>
          </div>
          <div className={styles.login__form}>
            <h1>Reset Your Password</h1>
            <Formik
              initialValues={{ password: "", conf_password: "" }}
              validationSchema={validationSchema}
              onSubmit={resetPassword}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Enter new password"
                  />
              
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm new password"
                  />
                

                  <div className={styles.buttons}>
                    <AnyBtn type="submit" text={isSubmitting ? "Resetting..." : "Reset Password"} />
                  </div>

                  {error && !errors.password && !errors.conf_password && (
                    <span style={{ color: "red" }}>{error}</span>
                  )}

                  {success && !errors.password && !errors.conf_password && (
                    <span style={{ color: "green" }}>{success}</span>
                  )}
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

// Funcția de server-side care verifică token-ul și returnează ID-ul utilizatorului
export async function getServerSideProps({ query }) {
  const token = query.token;

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    return {
      props: { user_id: decoded.id },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/invalid-token",
        permanent: false,
      },
    };
  }
}
