import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import FooterBtn from './FooterBtn';

function Footer() {
  return (
    <div className="div-footer">
      <footer className="footer" data-testid="footer">
        <FooterBtn
          to="/bebidas"
          testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinks"
        />
        <FooterBtn
          to="/explorar"
          testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore"
        />
        <FooterBtn
          to="/comidas"
          src={ mealIcon }
          alt="meals"
          testid="foot-bottom-btn"
        />
      </footer>
    </div>
  );
}

export default Footer;
