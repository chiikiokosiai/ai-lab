// src/sections/WhoWeAre/WhoWeAre.tsx
import { motion } from "framer-motion";
import styles from "./WhoWeAre.module.css";

// 参加者データ
const participantTypes = [
  {
    icon: "🚀",
    title: "起業家・起業準備中",
    description: "地域課題をAIで解決するビジネスを立ち上げたい方",
    color: "primary",
  },
  {
    icon: "💻",
    title: "ソロプレナー・個人開発者",
    description: "ChatGPTやLLMを活用してサービスを開発・提供している方",
    color: "secondary",
  },
  {
    icon: "⚡",
    title: "エンジニア",
    description: "社会起業や地域起業の技術支援に関心のあるプロフェッショナル",
    color: "accent",
  },
  {
    icon: "🏛️",
    title: "行政・自治体関係者",
    description: "地域課題にAIやテクノロジーでアプローチしたい職員の方",
    color: "primary",
  },
  {
    icon: "🎯",
    title: "ノンテック出身の開発者",
    description: "AIの力で開発やビジネスに挑戦している非エンジニア出身の方",
    color: "secondary",
  },
  {
    icon: "💰",
    title: "投資家・支援者",
    description: "社会的インパクトのある起業・プロジェクトを支援したい方",
    color: "accent",
  },
  {
    icon: "🌟",
    title: "地域活性化に関心のある方",
    description: "学生、社会人問わず地域づくりやテクノロジー活用に興味のある方",
    color: "primary",
  },
  {
    icon: "🤝",
    title: "コラボレーター",
    description: "異分野の専門性を持ち寄り、共創プロジェクトに参加したい方",
    color: "secondary",
  },
];

// グリッド全体のアニメーション
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 各カードのアニメーション
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ヘッダーアニメーション
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhoWeAre = () => {
  return (
    <section className={styles.section} id="participants">
      <div className="container">
        {/* セクションヘッダー */}
        <motion.div
          className={styles.sectionHeader}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>こんな人たちが参加しています</h2>
          <p>
            多様なバックグラウンドを持つメンバーが集まり、
            <br />
            それぞれの専門性を活かしながら地域×AIの可能性を追求しています
          </p>
        </motion.div>

        {/* 参加者カードグリッド */}
        <motion.div
          className={styles.participantsGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {participantTypes.map((participant, index) => (
            <motion.div
              key={index}
              className={`${styles.participantCard} ${
                styles[participant.color]
              }`}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.cardIcon}>{participant.icon}</div>
              <h3 className={styles.cardTitle}>{participant.title}</h3>
              <p className={styles.cardDescription}>
                {participant.description}
              </p>
              <div className={styles.cardGlow}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* 参加への誘導メッセージ */}
        <motion.div
          className={styles.joinMessage}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            あなたも<span className={styles.highlight}>地域おこし×AI</span>
            の一員になりませんか？
            <br />
            経験や職種に関係なく、地域の未来に関心のある方なら大歓迎です
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
