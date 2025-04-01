// src/sections/Hero/Hero.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "./Hero.module.css";
// 背景動画をインポート
import heroBackgroundVideo from "../../assets/hero-background.mp4";

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

const Hero = () => {
  // アニメーションコントロール
  const controls = useAnimation();

  // 画面サイズに応じてアニメーションを調整
  useEffect(() => {
    // 画面が読み込まれたらアニメーションを開始
    controls.start("visible");

    // ウィンドウのリサイズイベントを監視
    const handleResize = () => {
      // 必要に応じてアニメーションパラメータを調整
      // モバイルサイズかどうかを判定
      const isMobile = window.innerWidth <= 768;

      // モバイルではシェイプのサイズを調整するなどの処理
      if (isMobile) {
        // モバイル用の設定
      } else {
        // デスクトップ用の設定
      }
    };

    // 初回実行
    handleResize();

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [controls]);

  return (
    // sectionタグにid="concept"を設定
    <section className={styles.hero} id="concept">
      {/* 背景動画 */}
      <div className={styles.videoBackground}>
        <video className={styles.videoElement} autoPlay loop muted playsInline>
          <source src={heroBackgroundVideo} type="video/mp4" />
          お使いのブラウザは動画をサポートしていません。
        </video>
        {/* オーバーレイ */}
        <div className={styles.videoOverlay}></div>
      </div>

      {/* メインコンテンツ */}
      <div className={`container ${styles.heroContainer}`}>
        {/* motion.div で囲み、Staggering アニメーションを適用 */}
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate={controls} // useAnimationフックで制御
          whileInView="visible" // 要素が画面内に入ったらアニメーション開始
          viewport={{ once: false, amount: 0.3 }} // 何度でも、30%見えたら発火
        >
          {/* 見出し */}
          <motion.h1 variants={itemVariants}>
            AIの力で<br></br>
            <span className={styles.highlight}>地域</span>と
            <span className={styles.highlight}>人生</span>
            を変える
          </motion.h1>

          {/* 説明文 */}
          <motion.p variants={itemVariants}>
            地域おこし協力隊が生成AIを活用し<br></br>
            「地域課題の解決力」と「自己実現力」を高める<br></br>
            未来をデザインする実践型プログラム
          </motion.p>

          {/* ボタンエリア */}
          <motion.div className={styles.heroButtons} variants={itemVariants}>
            {/* プライマリボタン */}
            <motion.a
              href="#phases"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("phases");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`${styles.button} ${styles.buttonPrimary}`}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              プログラム詳細
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
