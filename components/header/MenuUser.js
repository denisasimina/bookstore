import Link from "next/link";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import {  signOut,signIn } from "next-auth/react";



export default function MenuUser({session}) {

  return (
    <div className={styles.menu}>
      <h2>Hello</h2>

      {session ? (
        <>
          <div className={styles.flex}>
            <img
              src={session.user.image}
              className={styles.menu_image}
            />
            <div className={styles.col}>
              <h4>Welcome Back,</h4>
              
              <h4 >{session.user.name}</h4>
             
             
              <p onClick={()=>signOut()}>Sign out</p>
           
            </div>
          </div>
        </>
      ) : (
        <div className={styles.flex}>
          <div className={styles.buttons}>
          <button onClick ={()=>signIn()} className={styles.btn_universal}>Sign in</button>
          <Link href="/signup" passHref>
          <button  className={styles.btn_universal}>Sign up</button>
        </Link>
        </div>
        </div>
      )}

      <ul className={styles.list}>
        {/* <li><Link href="/profile">Account</Link></li> */}
        {session?
        (<li><Link href="/myOrders/myOrder">My Orders</Link></li> )
:(<></>)}
        {/* <li><Link href="/profile">Address</Link></li> */}
      </ul>
    </div>
  );
}
