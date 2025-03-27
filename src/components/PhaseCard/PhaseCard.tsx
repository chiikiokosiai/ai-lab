// src/components/PhaseCard/PhaseCard.tsx
import { motion } from "framer-motion";
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

// 左ボーダーのアニメーションバリアント
const borderVariants = {
  initial: { scaleY: 0, originY: 0 }, // 初期状態: Yスケール0 (非表示、上基点)
  hover: {
    scaleY: 1,
    originY: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }, // ホバー状態: Yスケール1 (表示)
};

const PhaseCard: React.FC<PhaseCardProps> = ({
  number,
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      // initial, animate は親の staggerChildren で制御されるのでここでは不要な場合もあるが、
      // 個別に whileInView で制御するなら initial と whileInView を指定
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // 20%見えたら表示（一度だけ）
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

      {/* ホバー時に表示される左ボーダー */}
      <motion.div
        className={styles.cardBorder}
        variants={borderVariants}
        initial="initial" // variantsを使う場合、初期状態を initial で指定
        // whileHover は親要素に設定されているので、ここでは不要
      />
    </motion.div>
  );
};

export default PhaseCard;
