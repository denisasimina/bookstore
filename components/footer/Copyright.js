import styles from "./styles.module.scss";
import Link from "next/link";

export default function Copyright() {
    return (
        <div className={styles.copyright}>
            <div className={styles.copyright_container}>
                <ul>
                    {data.map((link, index) => (
                        <li key={index}>
                            <Link href={link.link}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const data = [
    { name: "Privacy Policy", link: "https://bookstore-simina-denisa-elenas-projects.vercel.app/privacy-policy" },
    { name: "Privacy & Cookies", link: "https://bookstore-simina-denisa-elenas-projects.vercel.app/privacy-policy" },
    { name: "Manage Cookies", link: "https://bookstore-simina-denisa-elenas-projects.vercel.app/manage-cookies" },
    { name: "Terms of Service", link: "https://bookstore-simina-denisa-elenas-projects.vercel.app/terms-of-service" },
    { name: "User Data Deletion", link: "https://bookstore-simina-denisa-elenas-projects.vercel.app/data-deletion" },
];
