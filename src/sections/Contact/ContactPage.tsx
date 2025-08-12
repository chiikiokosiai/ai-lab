// src/sections/Contact/ContactPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./ContactPage.module.css";

// 環境変数の取得と検証
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

// 環境変数の検証関数
const validateEnvironmentVariables = () => {
  const errors: string[] = [];

  if (!recaptchaSiteKey) {
    errors.push("VITE_RECAPTCHA_SITE_KEY が設定されていません");
  }

  if (!formspreeEndpoint) {
    errors.push("VITE_FORMSPREE_ENDPOINT が設定されていません");
  }

  return errors;
};

// 開発環境でのみ警告を表示
if (import.meta.env.DEV) {
  const envErrors = validateEnvironmentVariables();
  if (envErrors.length > 0) {
    console.warn("⚠️ 環境変数の設定が不完全です:");
    envErrors.forEach((error) => console.warn(`  - ${error}`));
    console.warn("フォーム送信機能が制限される可能性があります。");
  }
}

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
  // 環境変数が設定されているかチェック
  const isConfigured = recaptchaSiteKey && formspreeEndpoint;

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
    } else if (formData.name.length > 100) {
      newErrors.name = "お名前は100文字以内で入力してください";
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
      newErrors.message = "不適切な内容が含まれている可能性があります";
    }

    // reCAPTCHAのチェック（reCAPTCHAが設定されている場合のみ）
    if (recaptchaSiteKey && !captchaVerified) {
      newErrors.recaptcha =
        "「私はロボットではありません」にチェックしてください";
    }

    return newErrors;
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 環境変数が設定されていない場合のエラー処理
    if (!isConfigured) {
      setFormStatus({
        submitted: true,
        error: true,
        message:
          "フォームの設定が完了していません。管理者にお問い合わせください。",
      });
      return;
    }

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
      // 実際の送信処理
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[地域おこし×AI] ${formData.subject}`, // 件名にプレフィックスを追加
          _replyto: formData.email, // 返信先の設定
          _gotcha: "", // ハニーポット（スパム対策）
        }),
      });

      if (response.ok) {
        // 送信成功時の処理
        setFormStatus({
          submitted: true,
          error: false,
          message:
            "お問い合わせいただきありがとうございます。メッセージは正常に送信されました。通常2〜3営業日以内にご返信いたします。",
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
        let errorMessage = "送信に失敗しました。";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // JSONパースエラーの場合はデフォルトメッセージを使用
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      // エラー処理
      console.error("フォーム送信エラー:", error);
      setFormStatus({
        submitted: true,
        error: true,
        message:
          error instanceof Error
            ? `エラー: ${error.message}`
            : "メッセージの送信中にエラーが発生しました。後ほど再度お試しください。",
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
              地域おこし×AIコミュニティについてのご質問やご相談など、お気軽にお問い合わせください。
            </p>
          </div>

          {/* 環境変数が設定されていない場合の警告（開発環境のみ） */}
          {import.meta.env.DEV && !isConfigured && (
            <div
              className={styles.error}
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                ⚠️ 開発環境：フォーム送信の設定が不完全です。
                <br />
                .envファイルに以下の環境変数を設定してください：
                <br />
                {!recaptchaSiteKey && "- VITE_RECAPTCHA_SITE_KEY"}
                <br />
                {!formspreeEndpoint && "- VITE_FORMSPREE_ENDPOINT"}
              </p>
            </div>
          )}

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
                {formStatus.error ? "もう一度試す" : "新しいお問い合わせを作成"}
              </motion.button>
            </motion.div>
          ) : (
            // フォーム表示
            <motion.form
              className={styles.contactForm}
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              noValidate // HTML5のバリデーションを無効化（カスタムバリデーションを使用）
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
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <div
                    id="name-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.name}
                  </div>
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
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <div
                    id="email-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.email}
                  </div>
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
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                />
                {errors.subject && (
                  <div
                    id="subject-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.subject}
                  </div>
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
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <div
                    id="message-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.message}
                  </div>
                )}
              </motion.div>

              {/* reCAPTCHAが設定されている場合のみ表示 */}
              {recaptchaSiteKey && (
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
                    <div className={styles.errorText} role="alert">
                      {errors.recaptcha}
                    </div>
                  )}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className={styles.submitButton}
                variants={formItemVariants}
                custom={5}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                }}
                disabled={isSubmitting || !isConfigured}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "送信中..." : "送信する"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
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
