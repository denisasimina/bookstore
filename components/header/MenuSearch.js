import Link from "next/link";
import styles from "./styles.module.scss";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";


export default function MenuSearch() {
    const {cart}= useSelector((state)=>({...state}));

    return (
        <div className={styles.menuSearch}>
            <div className={styles.__container}>
                <Link href="/">
                {/* <div className={styles.logo}>
                  <img src="/logo.png"/> 
                </div> */}
                </Link>

                  
                <div className={styles.search}>
                    <input placeholder="Search" />
                    <div className={styles.icon_search}>
                    <FaSearch/>
                    </div>
                    </div>
                   
                  
                    <Link href="/cart/"> 
                    <div className={styles.cart}>
                    <IoCartOutline/>
                    <span>0</span>
                    </div>

                    </Link>
                
            </div>
        </div>
    );
}
