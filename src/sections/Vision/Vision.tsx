// src/sections/Vision/Vision.tsx
import { motion } from "framer-motion";
import styles from "./Vision.module.css";
// 画像ファイルをインポート (後で assets に配置)
import visionImage from "../../assets/vision-image.png";
// 左側のコンテンツ用アニメーションバリアント
const contentVariants = {
  hidden: { opacity: 0, x: -50 }, // 初期状態: 左から-50px、透明
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }, // 表示状態: X:0、不透明
};

// 右側の画像用アニメーションバリアント
const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 }, // 初期状態: 少し縮小、透明
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  }, // 表示状態: 通常サイズ、不透明 (少し遅れて表示)
};

// ドットパターンのSVGコンポーネント (ファイル分割してもOK)
const DotPattern = ({
  id,
  width = 10,
  height = 10,
  radius = 1,
}: {
  id: string;
  width?: number;
  height?: number;
  radius?: number;
}) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id={id}
        x="0"
        y="0"
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
      >
        <circle cx={radius} cy={radius} r={radius} fill="var(--primary)" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const Vision = () => {
  return (
    <section className={styles.section} id="vision">
      <div className={`container ${styles.visionContainer}`}>
        {/* 左側: テキストコンテンツ */}
        <motion.div
          className={styles.visionContent}
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>私たちの目指す未来</h2>
          <p>
            このラボから巣立った協力隊員が、AIを活用できる地域の中核人材となり、任期後も地域で活躍する。そんなロールモデルを全国へ輩出します。
          </p>
          <p>
            最終的には、この育成モデルが全国のスタンダードとなり、地域活性化の新しいエンジンとなることを目指しています。
          </p>
          {/* ボタン */}
          <motion.a
            href="#contact"
            className={`${styles.button} ${styles.buttonPrimary}`}
            whileHover={{
              y: -3,
              boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            未来を共に創る
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

        {/* 右側: 画像 */}
        <motion.div
          className={styles.visionImage}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <img src={visionImage} alt="チームで未来について話し合っている様子" />
          {/* 装飾ドット */}
          <div className={`${styles.visionDots} ${styles.dotsTopRight}`}>
            <DotPattern
              id="dot-pattern-1"
              width={12}
              height={12}
              radius={1.2}
            />
          </div>
          <div className={`${styles.visionDots} ${styles.dotsBottomLeft}`}>
            <DotPattern
              id="dot-pattern-2"
              width={18}
              height={18}
              radius={1.5}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
