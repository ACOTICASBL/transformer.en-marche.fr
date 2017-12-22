import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/fontawesome-free-brands';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ShareButtons, generateShareIcon } from 'react-share';

import '../../scss/layout.css';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const SOCIAL_COPY = "Suivez le progrès du gouvernement https://transformerlafrance.fr";

const Header = ({ locale }) =>
  <header className="header">
    <div className="header-left">
      <Link to={`/${locale}`} title="En Marche!" className="header-logo">EM!</Link><span className="header-sep"> | </span><span className="header-tag">Il l&apos;a dit, il le fait</span>
    </div>

    <div className="header-right">
      Partager
      <FacebookShareButton url={window.location} quote={SOCIAL_COPY}>
        <FacebookIcon round={true} size={35} iconBgStyle={{fill: '#ff6955'}}/>
      </FacebookShareButton>
      <TwitterShareButton url={window.location} title={SOCIAL_COPY}>
        <TwitterIcon round={true} size={35} iconBgStyle={{fill: '#ff6955'}}/>
      </TwitterShareButton>
    </div>

    <div className="header-right__mobile">
      <button className="header-button">Partager</button>
    </div>
  </header>

const Footer = () =>
  <footer className="footer">
    <div className="footer-body">
    © La République En Marche | <a href="https://en-marche.fr/mentions-legales" target="_blank" rel="noopener noreferrer">Mentions Légales</a> | <a href="https://en-marche.fr/politique-cookies" target="_blank" rel="noopener noreferrer">Politique de Cookies</a>
    </div>
  </footer>

class Page extends Component {
  render() {
    let { location } = this.props;
    let locale = location.pathname.slice(1).split('/')[0];
    let isDashboard = location && location.pathname.slice(1).split('/').length <= 1;
    return (
      <div className={`Page${isDashboard ? ' Page__dashboard' : ''}`}>
        <Header locale={locale} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default withRouter(Page);
