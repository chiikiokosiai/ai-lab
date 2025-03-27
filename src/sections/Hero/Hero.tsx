// src/sections/Hero/Hero.tsx
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
// ボタン用SVGアイコンをインポート (必要なら後で作成・配置)
// import ArrowIcon from '../../assets/arrow-right.svg';

// コンテンツ全体の表示アニメーション（Staggering用）
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 子要素を0.2秒ずつ遅延させて表示
      delayChildren: 0.3, // 全体のアニメーション開始を少し遅らせる
    },
  },
};

// 各テキスト要素のアニメーション
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// 背景シェイプのアニメーション
const shapeVariants = (duration: number, delay: number) => ({
  animate: {
    x: [0, 20, -10, 0], // 横方向の動き
    y: [0, -30, 15, 0], // 縦方向の動き
    rotate: [0, 90, -60, 0], // 回転
    scale: [1, 1.1, 0.95, 1], // スケール
    transition: {
      duration: duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror", // 行って戻るアニメーション
      delay: delay,
    } as const, // as const で型推論を正確に
  },
});

const Hero = () => {
  return (
    // sectionタグにid="concept"を設定
    <section className={styles.hero} id="concept">
      {/* 背景シェイプ */}
      <div className={styles.heroShapes}>
        <motion.div
          className={`${styles.heroShape} ${styles.shape1}`}
          variants={shapeVariants(35, 0)} // 期間35秒、遅延0秒
          animate="animate"
        />
        <motion.div
          className={`${styles.heroShape} ${styles.shape2}`}
          variants={shapeVariants(25, 2)} // 期間25秒、遅延2秒
          animate="animate"
        />
        <motion.div
          className={`${styles.heroShape} ${styles.shape3}`}
          variants={shapeVariants(40, 4)} // 期間40秒、遅延4秒
          animate="animate"
        />
      </div>

      {/* メインコンテンツ */}
      <div className={`container ${styles.heroContainer}`}>
        {/* motion.div で囲み、Staggering アニメーションを適用 */}
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // 要素が画面内に入ったらアニメーション開始
          viewport={{ once: true, amount: 0.3 }} // 1度だけ、30%見えたら発火
        >
          {/* 見出し */}
          <motion.h1 variants={itemVariants}>
            AIの力で
            <span className={styles.highlight}>地域</span>と
            <span className={styles.highlight}>人生</span>
            を変える
          </motion.h1>

          {/* 説明文 */}
          <motion.p variants={itemVariants}>
            地域おこし協力隊が生成AIを活用し「地域課題の解決力」と「自己実現力」を高める。未来をデザインする実践型プログラム。
          </motion.p>

          {/* ボタンエリア */}
          <motion.div className={styles.heroButtons} variants={itemVariants}>
            {/* プライマリボタン */}
            <motion.a
              href="#phases"
              className={`${styles.button} ${styles.buttonPrimary}`}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              プログラム詳細
              {/* アイコンはSVGを直接記述するか、imgタグで読み込む */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              {/* <img src={ArrowIcon} alt="" /> */}
            </motion.a>

            {/* セカンダリボタン */}
            <motion.a
              href="#contact"
              className={`${styles.button} ${styles.buttonSecondary}`}
              whileHover={{
                y: -2,
                boxShadow: "0 4px 8px rgba(58, 134, 255, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              今すぐ相談する
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
