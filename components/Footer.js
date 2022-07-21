import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerText}>Adrenargy Copyright, &copy; 2022</p>
      <p className={styles.footerText}>
        Built with <span className={styles.platform}>NextJS</span> and{" "}
        <span className={styles.platform}>Supabase</span>
      </p>
    </div>
  );
};

export default Footer;
