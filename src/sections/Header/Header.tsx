// src/sections/Header/Header.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Framer Motionをインポート
import styles from "./Header.module.css"; // CSS Modulesをインポート

const Header = () => {
  // スクロール状態を管理するためのState
  const [scrolled, setScrolled] = useState(false);

  // スクロールイベントを監視するEffect Hook
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollYが50pxより大きいかどうかでscrolledステートを更新
      setScrolled(window.scrollY > 50);
    };

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll);

    // クリーンアップ関数: コンポーネントがアンマウントされるときにリスナーを削除
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 空の依存配列[]は、このeffectがマウント時に1回だけ実行されることを意味します

  // ヘッダー全体のアニメーション設定
  const headerVariants = {
    hidden: { y: -100, opacity: 0 }, // 初期状態（上から-100px、透明）
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    }, // 表示状態（Y:0、不透明）
  };

  // ロゴアイコンのアニメーション設定
  const logoIconVariants = {
    animate: {
      scale: [1, 1.15, 1], // 拡大・縮小のアニメーション
      rotate: [0, 5, -5, 0], // 少し回転するアニメーション
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity, // 無限に繰り返す
        repeatDelay: 1, // 繰り返し間の待機時間
      },
    },
  };

  return (
    // motion.header を使用してアニメーションを適用
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} // スクロール状態に応じてクラスを切り替え
      variants={headerVariants}
      initial="hidden" // 初期状態は hidden
      animate="visible" // 表示時に visible アニメーションを実行
    >
      {/* containerクラスはindex.cssで定義済み */}
      <div className={`container ${styles.headerContainer}`}>
        {/* ロゴ */}
        <a href="#" className={styles.logo}>
          {/* ロゴアイコンにアニメーション適用 */}
          <motion.span
            className={styles.logoIcon}
            variants={logoIconVariants}
            animate="animate" // animate状態を常に適用
          >
            💡
          </motion.span>
          地域おこし協力隊 ×{" "}
          <span className={styles.logoTextAi}>生成AIラボ</span>
        </a>

        {/* ナビゲーション */}
        <nav className={styles.nav}>
          <ul>
            {/* 各メニュー項目 */}
            <li>
              <a href="#concept">コンセプト</a>
            </li>
            <li>
              <a href="#phases">5つのステップ</a>
            </li>
            <li>
              <a href="#vision">ビジョン</a>
            </li>
            {/* お問い合わせボタン */}
            <li>
              <motion.a
                href="#contact"
                className={`${styles.button} ${styles.buttonPrimary}`} // ボタン用のスタイルクラス
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                }} // ホバーアニメーション
                transition={{ duration: 0.2 }}
              >
                お問い合わせ
              </motion.a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
