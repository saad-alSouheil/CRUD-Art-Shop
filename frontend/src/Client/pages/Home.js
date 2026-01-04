import React from 'react';

//component:
import Reviews from '../components/Reviews';

import '../styles/Home.css';

function LandingPage () {

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Art that Speaks <span className="highlight">without Words</span>
            </h1>
            <p className="hero-description">
              Explore original paintings and commissions created using a variety of mediums, each piece reflecting a unique artistic style.</p>
          </div>
          
          <div className="hero-visual">
            
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="container">
            <div className="section-header">
                <p className="section-title">See what our customers have to say about their experience.</p>
            </div>
        <Reviews N={3}/>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;