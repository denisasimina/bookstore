import styles from "./styles.module.scss";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import MenuUser from "./MenuUser";
import { useSession } from "next-auth/react";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Top({carts,quantity}) {
  // console.log(carts)
  const {data:session}=useSession();
  const [isVisible,setIsVisible]=useState(false);


console.log(quantity,"llllllllllllll")



  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <ul className={styles.top_list}>
          {/* <li>
            <img src="/flag.png" />
            <span>Romania/ron</span>
          </li>
          <li>
            <span>custumer service</span>
          </li>
          <li>
            <span>Help</span>
          </li>

          <li>
            <FaRegHeart />
            <Link href="/net">
              <span>Whislist</span>
            </Link>
          </li> */}

          <li>
            {session?  
          (<Link href="/cart/cartPage"> 
                    <div className={styles.cart}>
                    <IoCartOutline/>

                    {quantity?
                    (<span>{quantity}</span>):
                    (<></>)


}
                    </div>

                    </Link>):(
                      <Link href="/signin"> 
                      <div className={styles.cart}>
                      <IoCartOutline/>
  
                      {quantity?
                      (<span>{quantity}</span>):
                      (<></>)
  
  
  }
                      </div>
  
                      </Link>

                    )}
          </li>
          <li onMouseOver={()=>setIsVisible(true)}
            onMouseLeave={()=>setIsVisible(false)}>
          {session ? (
            <li>
              <div className={styles.flex}>
                <img src={session.user.image} />
                <span>Denisa</span>
                <IoMdArrowDropdown />
              </div>
            </li>
          ) : (
            <li>
              <div className={styles.flex}>
                <MdOutlineAccountCircle />
                <span>Acoount</span>
                <IoMdArrowDropdown />
              </div>
            </li>
          )}
         
         {isVisible && <MenuUser session={session} />}     
            </li>
        </ul>
      </div>
    </div>
  );
}
