import Image from "next/image";
import styles from "./styles.module.scss";


export default function Payment() {
    return (
        <div className={styles.payment}>

            <div className={styles.payment__container}>
            <Image src="/payPal.png" alt="PayPal" width={50} height={30} />
            <Image src="/gPay.png" alt="Google Pay"width={50} height={30} />
            <Image src="/visa.png" alt="Visa" width={50} height={30} />
            <Image src="/amazon.png" alt="Amazon" width={50} height={30} />
            <Image src="/Apple.png" alt="Apple Pay"width={50} height={30} />
            <Image src="/bitcoin.png" alt="Bitcoin" width={50} height={30} />
            <Image src="/master.png" alt="MasterCard" width={50} height={30} />
        
            </div>
        </div>
    );
}

