// src/sections/Footer/Footer.tsx
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // ホームページかどうかのチェック
  const isHomePage = location.pathname === "/";

  // セクションにスクロールする関数
  const handleSectionScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // アニメーション設定
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkColumnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // ロゴアイコンのアニメーション（脈動効果）
  const logoIconVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      className={styles.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container">
        <div className={styles.footerContainer}>
          {/* 左: ロゴと情報 */}
          <motion.div
            className={styles.footerInfo}
            variants={linkColumnVariants}
          >
            <div className={styles.footerLogo}>
              <motion.span
                className={styles.logoIcon}
                variants={logoIconVariants}
                animate="animate"
              ></motion.span>
              <span className={styles.highlight}>地域おこし</span>
              <span className={styles.accent}>×</span>
              <span className={styles.highlight}>AI</span>
            </div>
            <p>
              地域×AI×起業のコミュニティプラットフォーム。
              <br />
              テクノロジーで地域の未来を創造します。
            </p>
          </motion.div>

          {/* 中央: サイトナビゲーション */}
          <motion.div
            className={styles.footerLinks}
            variants={linkColumnVariants}
          >
            <h3>サイトナビゲーション</h3>
            <ul>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#participants"
                    onClick={(e) => handleSectionScroll(e, "participants")}
                  >
                    参加者
                  </a>
                ) : (
                  <Link to="/">参加者</Link>
                )}
              </motion.li>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#phases"
                    onClick={(e) => handleSectionScroll(e, "phases")}
                  >
                    7つのステップ
                  </a>
                ) : (
                  <Link to="/">7つのステップ</Link>
                )}
              </motion.li>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#connect"
                    onClick={(e) => handleSectionScroll(e, "connect")}
                  >
                    つながり方
                  </a>
                ) : (
                  <Link to="/">つながり方</Link>
                )}
              </motion.li>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#vision"
                    onClick={(e) => handleSectionScroll(e, "vision")}
                  >
                    ビジョン
                  </a>
                ) : (
                  <Link to="/">ビジョン</Link>
                )}
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <motion.a
                  href="#contact"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 4px 8px rgba(58, 134, 255, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  お問い合わせ
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>

          {/* 中央: リソースリンク */}
          <motion.div
            className={styles.footerLinks}
            variants={linkColumnVariants}
          >
            <h3>リソース</h3>
            <ul>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  ブログ
                </a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  事例紹介
                </a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  よくある質問
                </a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  プライバシーポリシー
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* 右: SNSリンク */}
          <motion.div
            className={styles.footerLinks}
            variants={linkColumnVariants}
          >
            <h3>SNS</h3>
            <ul>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  X (Twitter)
                </a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  note
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* コピーライト */}
        <div className={styles.copyright}>
          © {currentYear} 地域おこし×AIコミュニティ All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
