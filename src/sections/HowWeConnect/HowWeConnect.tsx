// src/sections/HowWeConnect/HowWeConnect.tsx
import { motion } from "framer-motion";
import styles from "./HowWeConnect.module.css";

// 接続方法データ
const connectionMethods = [
  {
    title: "月1回のオンラインMeetup",
    description:
      "平日夜19:00〜21:00開催。キーノートトーク、ピッチセッション、交流タイムで濃密な2時間",
    features: [
      "ゲストによる講演",
      "メンバーによるLT",
      "テーマ別ディスカッション",
    ],
    highlight: "Next: 12月18日(水) 19:00〜",
    color: "primary",
  },
  {
    title: "Discord常設コミュニティ",
    description:
      "24時間つながる交流スペース。質問、アイデア共有、プロジェクト相談がいつでも可能",
    features: ["技術チャンネル", "地域別チャンネル", "プロジェクト部屋"],
    highlight: "現在150名が参加中",
    color: "secondary",
  },
  {
    title: "ハンズオン・ワークショップ",
    description:
      "実践的なスキル習得セッション。AIツールの使い方から開発手法まで、手を動かして学ぶ",
    features: ["AI活用実習", "コーディング体験", "データ分析入門"],
    highlight: "月2〜3回開催",
    color: "accent",
  },
  {
    title: "プロジェクト共創サポート",
    description:
      "アイデアを形にする実践の場。メンター制度とチーム形成で、確実に成果を生み出す",
    features: ["メンター制度", "チームマッチング", "実証実験支援"],
    highlight: "成功事例12件",
    color: "primary",
  },
];

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HowWeConnect = () => {
  return (
    <section className={styles.section} id="connect">
      <div className="container">
        {/* セクションヘッダー */}
        <motion.div
          className={styles.sectionHeader}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>つながり方・参加方法</h2>
          <p>
            オンラインとオフラインを組み合わせた多様な交流機会。
            <br />
            あなたのスタイルに合った方法で、コミュニティとつながりましょう
          </p>
        </motion.div>

        {/* 接続方法グリッド */}
        <motion.div
          className={styles.connectGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {connectionMethods.map((method, index) => (
            <motion.div
              key={index}
              className={`${styles.connectCard} ${styles[method.color]}`}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}></div>
                <div className={styles.cardTitleArea}>
                  <h3 className={styles.cardTitle}>{method.title}</h3>
                  <span className={styles.cardHighlight}>
                    {method.highlight}
                  </span>
                </div>
              </div>

              <p className={styles.cardDescription}>{method.description}</p>

              <ul className={styles.featureList}>
                {method.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div className={styles.cardGlow}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.connectCTA}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>今すぐ参加しよう</h3>
          <p>次回のMeetupや最新情報をお見逃しなく</p>
          <div className={styles.ctaButtons}>
            <motion.button
              className={`${styles.ctaButton} ${styles.buttonPrimary}`}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              Discord参加
            </motion.button>
            <motion.button
              className={`${styles.ctaButton} ${styles.buttonSecondary}`}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 15px rgba(131, 56, 236, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              次回Meetup予約
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeConnect;
