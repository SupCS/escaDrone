import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ContactsPage.css";
import { sendFeedback } from "../../api";

function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendFeedback(name, email, message);
      console.log(response);
      // Обробка успішного
      alert("Перемога");
    } catch (error) {
      console.error("Error in form submission: ", error);
      // Обробка помилки
      alert("Помилка. Форму не відправлено");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="contacts-container">
          <div className="contacts__header">
            <h1>Зворотній зв’язок</h1>
          </div>
          <div className="contacts-content">
            <div className="contacts-info">
              <div className="phone">
                <h3>Телефон</h3>
                <p>+380500445612</p>
              </div>
              <div className="telegram">
                <h3>Телеграм</h3>
                <p>@SupCS</p>
                <p>@yurii_q</p>
                <p>@vigillliae</p>
                <p>@dicantnik</p>
                <p>@DasPanzerschieff</p>
              </div>
            </div>
            <form className="contacts-form" onSubmit={handleSubmit}>
              <h3>Пропозиції та запитання</h3>
              <input
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Електронна адреса"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="area"
                placeholder="Ваше повідомлення"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button type="submit">Відправити</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactsPage;
