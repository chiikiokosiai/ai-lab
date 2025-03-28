// src/sections/Contact/ContactPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ContactPage.module.css";

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

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // FormspreeのエンドポイントURL（YOUR_FORM_ID部分は実際のIDに置き換える）
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
      } else {
        throw new Error("送信に失敗しました");
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message:
          "メッセージの送信中にエラーが発生しました。後ほど再度お試しください。",
      });
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
                />
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
                />
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
                />
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
                />
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                variants={formItemVariants}
                custom={4}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 15px rgba(58, 134, 255, 0.3)",
                }}
              >
                送信する
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
