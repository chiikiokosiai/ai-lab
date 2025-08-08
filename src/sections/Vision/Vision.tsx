// src/sections/Vision/Vision.tsx
import { motion } from "framer-motion";
import styles from "./Vision.module.css";

// コンテンツのアニメーションバリアント
const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// 統計データのアニメーション
const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 背景装飾のアニメーション
const decorationVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.8,
    },
  },
};

const Vision = () => {
  return (
    <section className={styles.section} id="vision">
      {/* 背景装飾 */}
      <motion.div
        className={styles.backgroundDecoration}
        variants={decorationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      />

      <div className={`container ${styles.visionContainer}`}>
        {/* 中央配置のコンテンツ */}
        <motion.div
          className={styles.visionContent}
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>コミュニティが描く未来像</h2>
          <p className={styles.mainDescription}>
            <span className={styles.highlight}>地域おこし×AI</span>の力で、
            日本全国に変革の波を起こす
          </p>
          <p>
            このコミュニティから巣立った人たちが、各地域でAIを活用した革新的なプロジェクトを展開。
            地域課題の解決から新産業の創出まで、テクノロジーと地域の力を掛け合わせた
            <strong>新しい日本の創造</strong>を目指しています。
          </p>

          {/* 将来の目標 */}
          <div className={styles.futureGoals}>
            <h3>2030年までの目標</h3>
            <div className={styles.goalsList}>
              <div className={styles.goalItem}>
                <span className={styles.goalIcon}>🗾</span>
                <span>全国47都道府県での地域×AIプロジェクト実現</span>
              </div>
              <div className={styles.goalItem}>
                <span className={styles.goalIcon}>👥</span>
                <span>コミュニティメンバー1万人突破</span>
              </div>
              <div className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>年間100件の地域課題解決事例創出</span>
              </div>
              <div className={styles.goalItem}>
                <span className={styles.goalIcon}>🚀</span>
                <span>地域発AIスタートアップ500社輩出</span>
              </div>
            </div>
          </div>

          {/* 統計データ */}
          <motion.div
            className={styles.statsContainer}
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>47</div>
              <div className={styles.statLabel}>都道府県への展開目標</div>
            </motion.div>
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>目標コミュニティメンバー数</div>
            </motion.div>
            <motion.div className={styles.statItem} variants={statItemVariants}>
              <div className={styles.statNumber}>500</div>
              <div className={styles.statLabel}>輩出予定スタートアップ数</div>
            </motion.div>
          </motion.div>

          {/* ボタン */}
          <motion.a
            href="#connect"
            className={`${styles.button} ${styles.buttonPrimary}`}
            whileHover={{
              y: -3,
              boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
            }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("connect");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            変革の一員になる
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
