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

      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1500000!2d25.4858296!3d42.7338825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbg!4v1680123456789!5m2!1sen!2sbg"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="map-markers">
          <div className="marker" style={{ top: "25%", left: "20%" }}>
            <div className="marker-circle">4</div>
          </div>
          <div className="marker" style={{ top: "35%", left: "40%" }}>
            <div className="marker-circle">6</div>
          </div>
          <div className="marker" style={{ top: "45%", left: "60%" }}>
            <div className="marker-circle">3</div>
          </div>
          <div className="marker" style={{ top: "55%", left: "30%" }}>
            <div className="marker-circle">5</div>
          </div>
          <div className="marker" style={{ top: "60%", left: "50%" }}>
            <div className="marker-circle">8</div>
          </div>
          <div className="marker" style={{ top: "65%", left: "70%" }}>
            <div className="marker-circle">4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
