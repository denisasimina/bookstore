import { SiMinutemailer } from "react-icons/si";
import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { useField } from "formik";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { MdOutlineLocationCity } from "react-icons/md";
export default function LoginInput({ icon, placeholder, ...props }) {
    const [field, meta] = useField(props);

    return (
        <div 
        className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""}`}>
            {icon === "user" ? (
                <BiUser />
            ) : icon === "email" ? (
               <MdOutlineMailOutline/>
            ) : icon === "password" ? (
                <IoKeyOutline />
            )  : icon==="phone"?(
                <FaPhoneAlt/>
            ):icon==="city"?(
                <FaPhoneAlt/>
            )
                
                :icon==="phone"?(
                    <FaPhoneAlt/>):(
                ""
            ) }
            <input
                type={field.type} 
                name={field.name}
                placeholder={placeholder}
                autocomplete="off" 
                {...field}
                {...props}
          
            />
            {/* Popup de eroare */}
            {meta.touched && meta.error && (
                <div className={styles.error__popup}>{meta.error}</div>
            )}
       
        </div>
    );
}
