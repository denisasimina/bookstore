import styles from "./styles.module.scss";
import Links from"./Links";
import StayInTouch from "./StayInTouch";
import Payment from"./Payment"
import Copyright from "./Copyright";
export default function Footer()
{
    return(

   <div className={styles.footer}>
    <div className={styles.footer__container}>
        <Links/>
        <StayInTouch/>
        <Payment/>
        <Copyright/>
       
        </div>
        </div>

    )
}