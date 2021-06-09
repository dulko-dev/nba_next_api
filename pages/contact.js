import { useState, useEffect } from "react";
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
    from_number: "",
  });

  let inputField;

  useEffect(() => {
    inputField = document.getElementById("replyTo");
    if (toSend.reply_to.length > 0) {
      inputField.style.border = "1px solid rgb(212, 212, 212)";
    }
  }, [toSend.reply_to]);

  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    inputField = document.getElementById("replyTo");

    if (toSend.reply_to.length === 0) {
      inputField.style.border = "1px solid red";
    }

    if (
      toSend.from_name.trim().length < 3 ||
      toSend.message.length === 0 ||
      toSend.reply_to.length === 0
    ) {
      setError(true);
      return;
    }

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
    setToSend({
      from_name: "",
      message: "",
      reply_to: "",
      from_number: "",
    });
    setError(false);
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
          {error && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                textTransform: "uppercase",
                padding: "10px 0",
              }}
            >
              Please fill empty fields
            </div>
          )}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              or You can send me an message
            </legend>
            <div className={styles.row}>
              <label htmlFor="fromName" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="fromName"
                name="from_name"
                value={toSend.from_name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="replyTo" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="replyTo"
                name="reply_to"
                value={toSend.reply_to}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="fromNumber" className={styles.label}>
                Number<span style={{ fontSize: "0.5em" }}>(optional)</span>
              </label>
              <input
                type="number"
                id="fromNumber"
                name="from_number"
                value={toSend.from_number}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <textarea
                placeholder="Place for the message"
                type="text"
                id="message"
                name="message"
                value={toSend.message}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.button}>
              Send
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Contact;
