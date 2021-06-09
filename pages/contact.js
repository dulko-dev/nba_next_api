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
  const [error, setError] = useState(false);
  const [goodSend, setGoodSend] = useState(false);

  const regexEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    let inputEmail = document.getElementById("replyTo");
    let inputName = document.getElementById("fromName");
    let inputMessage = document.getElementById("message");

    if (regexEmail(toSend.reply_to)) {
      inputEmail.style.border = "1px solid rgb(212, 212, 212)";
    }
    if (toSend.from_name.length > 1) {
      inputName.style.border = "1px solid rgb(212, 212, 212)";
    }
    if (toSend.message.trim().length > 1) {
      inputMessage.style.border = "1px solid rgb(212, 212, 212)";
    }
  }, [toSend.reply_to, toSend.from_name, toSend.message]);

  const onSubmit = (e) => {
    e.preventDefault();
    let inputEmail = document.getElementById("replyTo");
    let inputName = document.getElementById("fromName");
    let inputMessage = document.getElementById("message");

    if (!regexEmail(toSend.reply_to)) {
      inputEmail.style.border = "1px solid red";
    }
    if (toSend.from_name.length <= 1) {
      inputName.style.border = "1px solid red";
    }
    if (toSend.message.length === 0) {
      inputMessage.style.border = "1px solid red";
    }

    if (
      toSend.from_name.trim().length < 3 ||
      toSend.message.length === 0 ||
      regexEmail(toSend.reply_to) === false
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);

      return;
    }

    send(
      "service_vbte9e8",
      "template_v2qx5ne",
      toSend,
      "user_tkro5BbWGAiTWmR58DLTb"
    )
      .then((response) => {
        if (response.status === 200) {
          setGoodSend(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setToSend({
      from_name: "",
      message: "",
      reply_to: "",
      from_number: "",
    });
    setError(false);
    setTimeout(() => {
      setGoodSend(false);
    }, 6000);
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

        <form onSubmit={onSubmit} style={{ position: "relative" }}>
          {error && (
            <div className={styles.error}>Please fill empty fields</div>
          )}
          {goodSend && (
            <div className={styles.good}>Thank you, email has been sent.</div>
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
