import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { send } from "emailjs-com";
import styles from "../styles/Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const [toSend, setToSend] = useState({
    from_name: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    send(
      "service_vbte9e8",
      "template_v2qx5ne",
      toSend,
      "user_tkro5BbWGAiTWmR58DLTb"
    )
      .then((response) => {
        console.log("SUCCESS", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head></Head>
      <div className={styles.container}>
        <h2 className={styles.title}>You can catch me:</h2>
        <div className={styles.contact}>
          <Link href="https://github.com/dulko-dev" passHref={true}>
            <a target="_blank" className={styles.git}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Link>
          <Link
            href="https://www.linkedin.com/in/kamil-duliniec/"
            passHref={true}
          >
            <a target="_blank" className={styles.linken}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </Link>
        </div>
        <form onSubmit={onSubmit}>
          <label htmlFor="fromName" className={styles.label}>Your Name</label>
          <input
            type="text"
            id="fromName"
            name="from_name"
            value={toSend.from_name}
            onChange={handleChange}
          />
          <label htmlFor="replyTo" className={styles.label}>Your email</label>
          <input
            type="text"
            id="replyTo"
            name="reply_to"
            value={toSend.reply_to}
            onChange={handleChange}
          />
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            value={toSend.message}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button}>Button</button>
        </form>
      </div>
    </>
  );
}

export default Contact;
