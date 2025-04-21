import React from "react";
import "./Contacts.css";

const Contacts: React.FC = () => {
  return (
    <div className="contacts-page">
      <div className="contacts-container">
        <div className="contacts-header">
          <div className="region-selector">
            <select>
              <option>-Выбрать регион-</option>
            </select>
          </div>

          <div className="city-selector">
            <select>
              <option>-Выбрать город-</option>
            </select>
          </div>

          <div className="contact-info">
            <div className="phone">
              <span className="label">СПРАВОЧНАЯ СЛУЖБА</span>
              <span className="value">+380979740660</span>
            </div>
            <div className="email">
              <span className="label">E-MAIL</span>
              <span className="value">info@alcomag.com.ua</span>
            </div>
          </div>

          <button className="ask-question">ЗАДАТЬ ВОПРОС</button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
