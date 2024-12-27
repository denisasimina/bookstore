
import styles from "./styles.module.scss";

import Link from "next/link";
import { Formik, Field, Form, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Axios } from "axios";
import axios from "axios";
export default function NewsLetter()
{

    const[loading,setLoading]=useState(false)
    const validationSchema = Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        checked: Yup.boolean()
          .oneOf([true], "You must accept the terms and conditions")
          .required("You must accept the terms and conditions"),
      });


    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value });
    //   };
     

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setSubmitting(true);
    
        const options = {
          email: values.email,
        };
    
        try {
          // Make the POST request to your API
          const { data } = await axios.post("/api/auth/newsLetter", options);
          console.log("Response:", data);
          alert("You have successfully subscribed to the newsletter.");
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          alert("An error occurred, please try again.");
        }
    
        setLoading(false);
        setSubmitting(false);
      };
    
    

//    const handleSubmit =()=>{
//     console.log("nimic")
//    }

    return (
      <div className={styles.NewsLetter}>
        <div className={styles.container}>
          <h1>Subscribe for Updates and Book Recommendations</h1>
          <Formik
            initialValues={{ email: "", checked: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
            
              <div className={styles.email}>
               
                <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
                </div>
                <button type="submit">submit</button>
              
              
              </div>
              <div className={styles.check}>
                
              <div className={styles.row}>
                <Field
                 type="checkbox"
               
                 name="checked"
                 
                
                />
            
               
                
                <p>By checking this box, I agree to the </p>
                <p>Terms and Conditions</p>
                
                </div>
                <ErrorMessage
                  name="checked"
                  component="div"
                  className={styles.error}
                />
              </div>
             
            </Form>
          </Formik>
        </div>
      </div>
    );
}


