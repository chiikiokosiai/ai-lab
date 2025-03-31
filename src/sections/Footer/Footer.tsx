// src/sections/Footer/Footer.tsx
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

// フッターセクション全体のアニメーション
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// リンク列のアニメーション（Stagger Children）
const linkColumnVariants = {
  hidden: {}, // 親には特に指定なしでもOK
  visible: { transition: { staggerChildren: 0.1 } }, // 子要素を0.1秒ずつ遅延
};

// 個々のリンクアイテムのアニメーション
const linkItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Footer = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得
  const location = useLocation(); // 現在のページパスを取得
  const isHomePage = location.pathname === "/";

  // セクションへのスクロール処理
  const handleSectionScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.footer
      className={styles.footer}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible" // 画面内に入ったら表示
      viewport={{ once: false, amount: 0.1 }} // 10%見えたら（一度だけ）
    >
      <div className={`container`}>
        <div className={styles.footerContainer}>
          {/* 左: ロゴと説明 */}
          <div className={styles.footerInfo}>
            {/* ロゴ (Headerと同様のスタイルを適用) */}
            <Link to="/" className={styles.footerLogo}>
              <span className={styles.logoIcon}></span>地域おこし協力隊×{" "}
              <span className={styles.logoTextAi}>生成AIラボ</span>
            </Link>
            <p>
              AI時代の地域活性化をリードする人材育成プログラム。地域とあなたの未来を、共にデザインしましょう。
            </p>
          </div>

          {/* 中央: クイックリンク */}
          <motion.div
            className={styles.footerLinks}
            variants={linkColumnVariants} // StaggerChildrenを適用
          >
            <h3>クイックリンク</h3>
            <ul>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#concept"
                    onClick={(e) => handleSectionScroll(e, "concept")}
                  >
                    コンセプト
                  </a>
                ) : (
                  <Link to="/">コンセプト</Link>
                )}
              </motion.li>
              <motion.li variants={linkItemVariants}>
                {isHomePage ? (
                  <a
                    href="#phases"
                    onClick={(e) => handleSectionScroll(e, "phases")}
                  >
                    5つのステップ
                  </a>
                ) : (
                  <Link to="/">5つのステップ</Link>
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
              {/* 実際のSNSリンクに置き換えてください */}
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
          © {currentYear} 地域おこし協力隊 × 生成AIラボ All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
