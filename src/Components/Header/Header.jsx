import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "/moviestack.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleOnNavigation = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  const openSearch = (e) => {
    setShowSearch(true);
    setMobileMenu(false);
    searchQueryHandler(e);
  };
  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setMobileMenu(false);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY]);
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => { navigate("/"); setMobileMenu(false); }}>
          <span className="moviestackOnNavbar">MovieStack</span><img src={logo} alt="" width={18} height={18} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => { handleOnNavigation("movie") }}>Movies</li>
          <li className="menuItem" onClick={() => { handleOnNavigation("tv") }}>TV Shows</li>
          <li className="menuItem" onClick={openSearch} ><HiOutlineSearch /></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => { setMobileMenu(false) }} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text" placeholder="Search for a movie or tv show..." onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
            <VscChromeClose onClick={() => {
              setQuery("");
              setShowSearch(false);
            }}
            />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;