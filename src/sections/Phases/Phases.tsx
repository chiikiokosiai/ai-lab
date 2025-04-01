// src/sections/Phases/Phases.tsx
import { motion } from "framer-motion";
import PhaseCard from "../../components/PhaseCard/PhaseCard"; // 作成したカードコンポーネントをインポート
import styles from "./Phases.module.css";

// フェーズデータ
const phasesData = [
  {
    number: 0,
    icon: "🧭",
    title: "現在地の発見",
    description:
      "AIとの対話を通じ、価値観や強みを深く理解し、キャリアの羅針盤を設定します",
  },
  {
    number: 1,
    icon: "✍️",
    title: "言語化スキルの習得",
    description:
      "思考を整理し、伝わる言葉へ。生成AIを活用した思考整理と文章力向上トレーニング",
  },
  {
    number: 2,
    icon: "🔍",
    title: "地域インサイトの探求",
    description:
      "AIによるデータ分析で住民のニーズを可視化。本質的な地域課題を発見する力を養います",
  },
  {
    number: 3,
    icon: "🗺️",
    title: "未来ロードマップ設計",
    description:
      "自己の強みと地域ニーズを掛け合わせ、実現可能な事業アイデアと行動計画を創出します",
  },
  {
    number: 4,
    icon: "🚀",
    title: "実践と共創",
    description:
      "計画を実行に移し、SNS等で発信。仲間を集め、地域内外との連携によるインパクト創出へ",
  },
];

// グリッド全体のアニメーション（Stagger Children用）
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // カードを0.15秒ずつ遅延表示
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
    // sectionタグにid="phases"と背景色用クラスを設定
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
            育成の<span className={styles.highlightNumber}>5</span>ステップ
          </h2>
          <p>
            自己理解から地域貢献、そして未来設計へ。生成AIを相棒に、あなたの可能性を最大限に引き出すステップバイステップの旅。
          </p>
        </motion.div>

        {/* カードグリッド */}
        <motion.div
          className={styles.phasesGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible" // グリッド全体が画面に入ったら子要素のアニメーション開始
          viewport={{ once: false, amount: 0.1 }} // 10%見えたら
        >
          {/* データからカードを生成 */}
          {phasesData.map((phase) => (
            // PhaseCardコンポーネントを使用
            // PhaseCard自体のvariants (cardVariants) がここで適用される
            <PhaseCard
              key={phase.number}
              number={phase.number}
              icon={phase.icon}
              title={phase.title}
              description={phase.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Phases;
