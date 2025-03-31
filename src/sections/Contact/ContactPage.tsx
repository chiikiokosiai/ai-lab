// src/sections/Contact/ContactPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./ContactPage.module.css";

// 環境変数からキーを取得
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

// アニメーション設定
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

// フォームデータの型定義
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// エラーの型定義
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  recaptcha?: string;
}

// フォーム送信の状態
interface FormStatus {
  submitted: boolean;
  error: boolean;
  message: string;
}

const ContactPage = () => {
  // 送信状態の管理
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    error: false,
    message: "",
  });

  // フォームデータの管理
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // エラーの管理
  const [errors, setErrors] = useState<FormErrors>({});

  // reCAPTCHAの状態管理
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // 送信ボタンの無効状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 前回送信時刻の管理（スパム対策）
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  // 入力フィールドの変更を処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 入力時にそのフィールドのエラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // フォームのバリデーション
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // 名前のバリデーション - 空でないことと日本語文字を含むか
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    } else if (
      !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(formData.name)
    ) {
      newErrors.name = "日本語の文字を含めてください";
    }

    // メールアドレスのバリデーション
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // 件名のバリデーション
    if (!formData.subject.trim()) {
      newErrors.subject = "件名を入力してください";
    } else if (formData.subject.length > 100) {
      newErrors.subject = "件名は100文字以内で入力してください";
    }

    // メッセージのバリデーション
    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください";
    } else if (formData.message.length > 3000) {
      newErrors.message = "お問い合わせ内容は3000文字以内で入力してください";
    }

    // スパム内容のチェック
    const spamWords = [
      "casino",
      "viagra",
      "lottery",
      "winner",
      "free money",
      "bitcoin",
    ];
    const messageAndSubject = (
      formData.message +
      " " +
      formData.subject
    ).toLowerCase();

    if (spamWords.some((word) => messageAndSubject.includes(word))) {
      newErrors.message = "スパムと判定される内容が含まれています";
    }

    // 全て英語のみの内容をチェック - 日本語のサイトの場合
    const hasJapaneseContent = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(
      formData.message
    );
    if (!hasJapaneseContent && formData.message.length > 50) {
      newErrors.message = "日本語の内容を含めてください";
    }

    // reCAPTCHAのチェック
    if (!captchaVerified) {
      newErrors.recaptcha =
        "「私はロボットではありません」にチェックしてください";
    }

    return newErrors;
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 連続送信防止
    if (isSubmitting) return;

    // レート制限のチェック（1分に1回まで）
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "しばらく時間をおいてから再度お試しください",
      });
      return;
    }

    // バリデーション実行
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 実際の送信処理（APIエンドポイントは環境変数または設定ファイルから取得するべき）
      // 実際の送信処理の部分を探して
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[生成AIラボ] ${formData.subject}`, // 件名にプレフィックスを追加
        }),
      });

      if (response.ok) {
        // 送信成功時の処理
        setFormStatus({
          submitted: true,
          error: false,
          message:
            "お問い合わせいただきありがとうございます。メッセージは正常に送信されました。",
        });
        // フォームをリセット
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setCaptchaVerified(false);
        // 送信時刻を記録
        setLastSubmitTime(Date.now());
      } else {
        // APIからのエラーレスポンス
        const errorData = await response.json();
        throw new Error(errorData.message || "送信に失敗しました");
      }
    } catch (error) {
      // エラー処理
      setFormStatus({
        submitted: true,
        error: true,
        message:
          "メッセージの送信中にエラーが発生しました。後ほど再度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contact-page">
      <div className="container">
        <motion.div
          className={styles.contactContainer}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.contactHeader}>
            <h1>お問い合わせ</h1>
            <p>
              生成AIラボについてのご質問やご相談など、お気軽にお問い合わせください。
            </p>
          </div>

          {formStatus.submitted ? (
            // 送信後の表示
            <motion.div
              className={`${styles.formMessage} ${
                formStatus.error ? styles.error : styles.success
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>{formStatus.message}</p>
              {!formStatus.error && (
                <motion.button
                  className={styles.button}
                  onClick={() =>
                    setFormStatus({
                      submitted: false,
                      error: false,
                      message: "",
                    })
                  }
                  whileHover={{ y: -2 }}
                >
                  新しいお問い合わせを作成
                </motion.button>
              )}
            </motion.div>
          ) : (
            // フォーム表示
            <motion.form
              className={styles.contactForm}
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className={styles.formGroup}
                variants={formItemVariants}
                custom={0}
              >
                <label htmlFor="name">
                  お名前 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="山田 太郎"
                  className={errors.name ? styles.errorInput : ""}
                />
                {errors.name && (
                  <div className={styles.errorText}>{errors.name}</div>
                )}
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={formItemVariants}
                custom={1}
              >
                <label htmlFor="email">
                  メールアドレス <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className={errors.email ? styles.errorInput : ""}
                />
                {errors.email && (
                  <div className={styles.errorText}>{errors.email}</div>
                )}
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={formItemVariants}
                custom={2}
              >
                <label htmlFor="subject">
                  件名 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="お問い合わせの件名"
                  className={errors.subject ? styles.errorInput : ""}
                />
                {errors.subject && (
                  <div className={styles.errorText}>{errors.subject}</div>
                )}
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={formItemVariants}
                custom={3}
              >
                <label htmlFor="message">
                  お問い合わせ内容 <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="お問い合わせ内容を入力してください"
                  className={errors.message ? styles.errorInput : ""}
                />
                {errors.message && (
                  <div className={styles.errorText}>{errors.message}</div>
                )}
              </motion.div>

              <motion.div
                className={styles.formGroup}
                variants={formItemVariants}
                custom={4}
              >
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={(value) => {
                    setCaptchaVerified(!!value);
                    if (errors.recaptcha) {
                      setErrors({ ...errors, recaptcha: undefined });
                    }
                  }}
                />
                {errors.recaptcha && (
                  <div className={styles.errorText}>{errors.recaptcha}</div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                variants={formItemVariants}
                custom={5}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中..." : "送信する"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
