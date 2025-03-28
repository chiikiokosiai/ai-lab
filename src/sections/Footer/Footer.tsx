// src/sections/Footer/Footer.tsx
import { motion } from "framer-motion";
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
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>💡</span>{" "}
              <span className={styles.logoTextAi}>生成AIラボ</span>
            </div>
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
                <a href="#concept">コンセプト</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#phases">5つのステップ</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#vision">ビジョン</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#contact">お問い合わせ</a>
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
                <a href="#">ブログ</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#">事例紹介</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#">よくある質問</a>
              </motion.li>
              <motion.li variants={linkItemVariants}>
                <a href="#">プライバシーポリシー</a>
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
