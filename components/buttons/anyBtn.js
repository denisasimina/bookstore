
import styles from"./styles.module.scss"
import { FaArrowRight } from "react-icons/fa";
export default function AnyBtn({type,text,icon})
{
    return (
        <div className={styles.button}>
            <div className={styles.svg_wrap}>
            <button type={type}>{text}</button>
           
            
            </div>
          </div>  
        )
   
}