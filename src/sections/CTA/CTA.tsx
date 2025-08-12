// src/sections/CTA/CTA.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // React Routerのリンクをインポート
import styles from "./CTA.module.css";

// セクション全体の表示アニメーション
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// コンテンツ（テキストやボタン）のアニメーション
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

// 背景の装飾要素のアニメーション
const decoVariants = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring", // バネのような動き
      stiffness: 100,
      damping: 15,
      delay: delay,
    },
  },
});

const CTA = () => {
  return (
    <motion.section
      className={styles.cta}
      id="contact" // idを設定
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* 背景の装飾 */}
      <motion.div
        className={`${styles.deco} ${styles.decoTopLeft}`}
        variants={decoVariants(0.5)}
      />
      <motion.div
        className={`${styles.deco} ${styles.decoBottomRight}`}
        variants={decoVariants(0.7)}
      />

      <div className={`container ${styles.ctaContainer}`}>
        {/* コンテンツ */}
        <motion.div
          variants={contentVariants} // コンテンツ全体に適用
        >
          <h2>AIで地域の未来をデザインしませんか？</h2>
          <p>
            地域でAI事業を始めたい方、技術で社会課題を解決したいエンジニア、
            民間連携を模索する自治体の方、地域起業を支援したい投資家の方。
            あなたのアイデアと情熱が、地域の未来を変える第一歩になります。
          </p>
          <motion.div
            whileHover={{
              y: -3,
              boxShadow: "0 8px 15px rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/contact"
              className={`${styles.button} ${styles.buttonWhite}`}
            >
              お問い合わせフォームへ
              {/* アイコン例 (SVG直接記述) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA;
