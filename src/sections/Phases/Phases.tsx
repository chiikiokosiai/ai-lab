// src/sections/Phases/Phases.tsx
import { motion } from "framer-motion";
import PhaseCard from "../../components/PhaseCard/PhaseCard";
import styles from "./Phases.module.css";

// フェーズデータ（コミュニティ参加の流れ）
const phasesData = [
  {
    number: 0,
    icon: "🧭",
    title: "興味・関心の発見",
    description:
      "地域×AIの可能性に気づく。あなたの関心や課題意識がコミュニティとつながる第一歩",
  },
  {
    number: 1,
    icon: "👥",
    title: "コミュニティ参加",
    description:
      "オンラインMeetupやDiscordで仲間と出会う。多様な背景を持つメンバーとの交流が始まり",
  },
  {
    number: 2,
    icon: "📚",
    title: "学び・スキル習得",
    description:
      "仲間と一緒にAIスキルを身につける。ワークショップや勉強会で実践的な知識を共有",
  },
  {
    number: 3,
    icon: "💡",
    title: "プロジェクト創出",
    description:
      "コラボレーションでアイデアを形に。異なる専門性を持つメンバーとの共創でプロジェクトが生まれる",
  },
  {
    number: 4,
    icon: "🚀",
    title: "実践・インパクト創出",
    description:
      "地域での実装・実証実験。プロジェクトを実際に地域に展開し、社会的インパクトを生み出す",
  },
  {
    number: 5,
    icon: "📈",
    title: "AIマーケティング応用",
    description:
      "最新のAI手法でマーケティングを強化。データ分析からコンテンツ生成まで実践的なスキルを習得",
  },
  {
    number: 6,
    icon: "💻",
    title: "Vibecoding開発",
    description:
      "音楽・感情とコードの融合開発。最新のクリエイティブテクノロジーで表現の可能性を広げる",
  },
];

// グリッド全体のアニメーション（Stagger Children用）
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 7個になったので少し早く
    },
  },
};

// セクションヘッダーのアニメーション
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Phases = () => {
  return (
    <section className={`${styles.section} ${styles.bgGray}`} id="phases">
      <div className={`container`}>
        {/* セクションヘッダー */}
        <motion.div
          className={styles.sectionHeader}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2>
            コミュニティ参加の<span className={styles.highlightNumber}>7</span>
            ステップ
          </h2>
          <p>
            興味・関心からスタートして、仲間と学び、プロジェクトを創出。最新のAI技術まで習得できる段階的な成長プロセス
          </p>
        </motion.div>

        {/* カードグリッド */}
        <motion.div
          className={styles.phasesGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* データからカードを生成 */}
          {phasesData.map((phase) => (
            <PhaseCard
              key={phase.number}
              number={phase.number}
              icon={phase.icon}
              title={phase.title}
              description={phase.description}
            />
          ))}

          {/* さらに詳しく見るボタン（Vibecodingカードの隣に配置） */}
          <motion.div
            className={styles.moreInfoCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              className={styles.moreInfoButton}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
              }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                // 将来的には詳細ページへのリンク
                console.log("詳細ページへ移動（未実装）");
              }}
            >
              さらに詳しく見る
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
            </motion.button>
            <p className={styles.moreInfoText}>
              各ステップの詳細カリキュラムや、追加の専門講座についてご紹介します
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Phases;
