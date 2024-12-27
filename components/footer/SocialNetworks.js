import Link from "next/link";
import styles from "./styles.module.scss";
import { FaFacebook,FaInstagram, FaTiktok,FaPinterest,FaSnapchatGhost} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
export default function SocialNetworks()
{
    return(
       <div className={styles.SocialNetworks}>
        <div className={styles.container}>
            <h1>Follow us on social media</h1>
            <ul>
                <li>
                <Link href="/"><FaFacebook/>
                </Link>
                </li>
                <li>
                <Link href="/"><FaInstagram/></Link>
                </li>
                <li>
                <Link href="/"><FaTwitter/></Link>
                </li>
                <li>
                <Link href="/"><FaPinterest/></Link>
                </li>
                <li>
                <Link href="/"><FaSnapchatGhost/></Link>
                </li>
                <li>
                <Link href="/"><FaTiktok/></Link>
                </li>
                <li>
                <Link href="/"><BsThreads/></Link>
                </li>
            </ul>

        </div>

       </div>
    )
}