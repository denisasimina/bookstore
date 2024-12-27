
import { flashDealsArray } from "../../../data/home";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";


export default function FlashCards({ product }) {
const router=useRouter();
const handleImage=(id)=>{

    router.push(`/product/${product._id}`)

}

    return (
        <div className={styles.cards}>
            <div className={styles.card_img}>
                
                    <img  src={product.image} alt="Product Image" 
                    onClick={()=>handleImage(product._id)}/>
                
                <div className={styles.flash}>
                    <span>{product.discount}% OFF</span>
                </div>
            </div>
            <div className={styles.card_price}>
                {/* Calculate the discounted price using product.discount */}
                <span>EUR {(product.price - (product.price * product.discount) / 100).toFixed(2)}€</span>
                <span> EUR {product.price}€</span>
            </div>
            <div className={styles.card_bar}>
                <div className={styles.card_bar_inner} style={{ width: "75%" }}></div>
            </div>
        </div>
    );
}
