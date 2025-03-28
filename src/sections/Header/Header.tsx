// src/sections/Header/Header.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresenceを追加
import styles from "./Header.module.css"; // CSS Modulesをインポート

const Header = () => {
  // スクロール状態を管理するためのState
  const [scrolled, setScrolled] = useState(false);
  // モバイルメニューの開閉状態を管理するState
  const [menuOpen, setMenuOpen] = useState(false);

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

  // メニューが開いているときにスクロールを無効にする
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // スクロールバー分の余白を追加してガタつきを防止
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  // メニュー項目をクリックしたときにモバイルメニューを閉じる
  const handleNavItemClick = () => {
    setMenuOpen(false);
  };

  // ヘッダー全体のアニメーション設定
  const headerVariants = {
    hidden: { y: -100, opacity: 0 }, // 初期状態（上から-100px、透明）
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    }, // 表示状態（Y:0、不透明）
  };

  // モバイルメニューのアニメーション設定
  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  // メニュー項目のアニメーション設定（スタガー効果）
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
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

  // ハンバーガーメニューボタンのアニメーション
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  return (
    <>
      {/* モバイルメニュー（オーバーレイ） - 別の場所に移動 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ zIndex: 1000 }}
          >
            <nav className={styles.mobileNav}>
              <ul>
                <motion.li
                  custom={0}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a href="#concept" onClick={handleNavItemClick}>
                    コンセプト
                  </a>
                </motion.li>
                <motion.li
                  custom={1}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a href="#phases" onClick={handleNavItemClick}>
                    5つのステップ
                  </a>
                </motion.li>
                <motion.li
                  custom={2}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a href="#vision" onClick={handleNavItemClick}>
                    ビジョン
                  </a>
                </motion.li>
                <motion.li
                  custom={3}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.a
                    href="#contact"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={handleNavItemClick}
                  >
                    お問い合わせ
                  </motion.a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ヘッダー */}
      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          menuOpen ? styles.menuOpen : ""
        }`} // スクロール状態に応じてクラスを切り替え
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
            </motion.span>{" "}
            <span className={styles.logoTextAi}>生成AIラボ</span>
          </a>

          {/* ハンバーガーメニューボタン（モバイル用） */}
          <motion.button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            initial="closed"
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span className={styles.line} variants={lineVariants} />
            <motion.span className={styles.line} variants={line2Variants} />
            <motion.span className={styles.line} variants={line3Variants} />
          </motion.button>

          {/* PCナビゲーション */}
          <nav className={styles.nav}>
            <ul>
              {/* 各メニュー項目 */}
              <li>
                <a href="#concept" onClick={handleNavItemClick}>
                  コンセプト
                </a>
              </li>
              <li>
                <a href="#phases" onClick={handleNavItemClick}>
                  5つのステップ
                </a>
              </li>
              <li>
                <a href="#vision" onClick={handleNavItemClick}>
                  ビジョン
                </a>
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
                  onClick={handleNavItemClick}
                >
                  お問い合わせ
                </motion.a>
              </li>
            </ul>
          </nav>

          {/* モバイルメニュー（オーバーレイ） */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className={styles.mobileMenu}
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ zIndex: 1000 }}
              >
                <nav className={styles.mobileNav}>
                  <ul>
                    <motion.li
                      custom={0}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a href="#concept" onClick={handleNavItemClick}>
                        コンセプト
                      </a>
                    </motion.li>
                    <motion.li
                      custom={1}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a href="#phases" onClick={handleNavItemClick}>
                        5つのステップ
                      </a>
                    </motion.li>
                    <motion.li
                      custom={2}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a href="#vision" onClick={handleNavItemClick}>
                        ビジョン
                      </a>
                    </motion.li>
                    <motion.li
                      custom={3}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.a
                        href="#contact"
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        whileHover={{
                          y: -3,
                          boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                        onClick={handleNavItemClick}
                      >
                        お問い合わせ
                      </motion.a>
                    </motion.li>
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
