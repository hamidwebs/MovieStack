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
          <b>Movie Stack</b> App is an elegantly designed application that allows users to browse and view a vast collection of movies and TV shows. The app features a visually appealing interface that enhances the user experience, making it easy and enjoyable to discover and explore new content.
        </div>
        <div className="socialIcons">
          <span className="icon" onClick={() => window.open("https://www.facebook.com/profile.php?id=100086097632039")}>
            <FaFacebookF />
          </span>
          <span className="icon" onClick={() => window.open("https://www.instagram.com/hamid_mughal_786/")}>
            <FaInstagram />
          </span>
          <span className="icon" onClick={() => window.open("https://www.linkedin.com/in/abdullah-mughal786/")} >
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
