import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../ContentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          The Movie Stack React App is a dynamic web application designed and developed by Hamid Raza. It serves as a platform for users to discover, explore, and learn about various movies. Leveraging React, a popular JavaScript library for building user interfaces, the app provides an intuitive and interactive experience for users.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF onClick={() => window.open("https://www.facebook.com/profile.php?id=100086097632039")} />
          </span>
          <span className="icon">
            <FaInstagram onClick={() => window.open("https://www.https://www.instagram.com/hamid_mughal_786/")} />
          </span>
          <span className="icon">
            <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/abdullah-mughal786/")} />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
