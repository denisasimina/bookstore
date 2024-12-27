import Link from "next/link";
import styles from "./styles.module.scss";
export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link) => (
        <ul key={index}>
          <b>{link.heading}</b>
          {link.links.map((link) => (
            <li key={subIndex}>
            <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
const links = [
    {
      heading: "About BookHouse",
      links: [
        { name: "About us", link: "#" },
        { name: "Contact us", link: "#" },
        { name: "Our Story", link: "#" },
      ],
    },
    {
      heading: "Help & Support",
      links: [
        { name: "FAQ", link: "#" },
        { name: "Customer Support", link: "#" },
        { name: "Shipping Info", link: "#" },
        { name: "Book Recommendations", link: "#" },
      ],
    },
    {
      heading: "Customer Service",
      links: [
        { name: "Return Policy", link: "#" },
        { name: "Contact Customer Service", link: "#" },
        { name: "Membership & Rewards", link: "#" },
        { name: "Gift Cards", link: "#" }
      ],
    },
  ];
  