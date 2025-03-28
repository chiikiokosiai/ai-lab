// src/components/PhaseCard/PhaseCard.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./PhaseCard.module.css";

// Propsの型定義 (TypeScript)
interface PhaseCardProps {
  number: number | string; // 番号 (文字列も許容)
  icon: string; // 絵文字アイコン
  title: string; // タイトル
  description: string; // 説明文
}

// カードのアニメーションバリアント
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 }, // 初期状態: 下に50px、少し縮小、透明
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }, // 表示状態: Y:0、通常サイズ、不透明
  },
};

// 左ボーダーのアニメーションバリアント（デスクトップ用）
const borderVariantsDesktop = {
  initial: { scaleY: 0, originY: 0 }, // 初期状態: Yスケール0 (非表示、上基点)
  hover: {
    scaleY: 1,
    originY: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }, // ホバー状態: Yスケール1 (表示)
};

// 下ボーダーのアニメーションバリアント（モバイル用）
const borderVariantsMobile = {
  initial: { scaleX: 0, originX: 0 }, // 初期状態: Xスケール0 (非表示、左基点)
  hover: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }, // ホバー状態: Xスケール1 (表示)
};

const PhaseCard: React.FC<PhaseCardProps> = ({
  number,
  icon,
  title,
  description,
}) => {
  // レスポンシブ対応のための状態
  const [isMobile, setIsMobile] = useState(false);

  // 画面サイズ変更を監視してモバイル判定を更新
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    // 初回実行
    handleResize();

    // リサイズイベントリスナーを登録
    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      // initial, animate は親の staggerChildren で制御されるのでここでは不要な場合もあるが、
      // 個別に whileInView で制御するなら initial と whileInView を指定
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // 20%見えたら表示（一度だけ）
      whileHover="hover" // ホバー状態を 'hover' と名付ける
    >
      {/* 背景の大きな数字 */}
      <div className={styles.cardNumber}>{number}</div>
      {/* アイコン */}
      <span className={styles.cardIcon}>{icon}</span>
      {/* タイトル */}
      <h3 className={styles.cardTitle}>{title}</h3>
      {/* 説明文 */}
      <p className={styles.cardDescription}>{description}</p>

      {/* ホバー時に表示されるボーダー（レスポンシブ対応） */}
      <motion.div
        className={styles.cardBorder}
        variants={isMobile ? borderVariantsMobile : borderVariantsDesktop}
        initial="initial" // variantsを使う場合、初期状態を initial で指定
        // whileHover は親要素に設定されているので、ここでは不要
        style={{
          // モバイル表示では下ボーダーに変更
          width: isMobile ? "100%" : "5px",
          height: isMobile ? "4px" : "100%",
          top: isMobile ? "auto" : 0,
          bottom: isMobile ? 0 : "auto",
          left: 0,
          transformOrigin: isMobile ? "left" : "top",
        }}
      />
    </motion.div>
  );
};

export default PhaseCard;
