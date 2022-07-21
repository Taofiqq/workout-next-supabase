import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { FaRegUser } from "react-icons/fa";

const Navbar = ({ user }) => {
  return (
    <nav className={styles.navContainer}>
      <div>
        <Link href="/">
          <a
            style={{
              cursor: "pointer",
            }}
          >
            Adrenargy
          </a>
        </Link>
      </div>

      <div className={styles.right}>
        {user && (
          <Link href="/create">
            <p className={styles.create}>Create New Workout</p>
          </Link>
        )}
        <Link href="/user">
          <a>
            {user ? (
              <FaRegUser />
            ) : (
              <button className={styles.loginButton}>Login</button>
            )}
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
