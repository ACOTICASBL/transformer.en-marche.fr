import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/fontawesome-free-brands';

import '../scss/Page.css';

const Header = () =>
  <header className="header">
    <div className="header-left">
      <a href="https://en-march.fr" title="En Marche!" target="_blank" rel="noopener noreferrer" className="header-logo">EM!</a> <span className="header-tag">Alors, ça avance?</span>
    </div>
    
    <div className="header-right">
      Partager
      <a href="" className="header-social" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="" className="header-social" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  </header>

const Footer = () =>
  <footer className="footer">
    <div className="footer-body">
    © La République En Marche | <a href="" target="_blank" rel="noopener noreferrer">Mentions Légales</a> | <a href="" target="_blank" rel="noopener noreferrer">Politique de Cookies</a>
    </div>
  </footer>

export default class Page extends Component {
  render() {
    return (
      <div className="Page">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
