import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌓';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.background = 'var(--primary-color)';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.fontSize = '24px';
    darkModeToggle.style.cursor = 'pointer';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Simple animation on scroll
    const handleScroll = () => {
      const features = document.querySelectorAll('.feature');
      features.forEach(feature => {
        const featureTop = feature.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (featureTop < screenHeight * 0.8) {
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    mobileMenu.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeChild(darkModeToggle);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>StoryTaxi - AI-Powered Interactive Storytelling</title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --primary-color: #FF6B6B;
          --secondary-color: #4ECDC4;
          --background-color: #F7F7F7;
          --text-color: #2C3E50;
          --light-text-color: #95A5A6;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Open Sans', sans-serif;
          line-height: 1.8;
          color: var(--text-color);
          background-color: var(--background-color);
        }
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        header {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-family: 'Merriweather', serif;
          font-size: 28px;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        nav ul {
          display: flex;
          list-style: none;
        }
        
        nav ul li {
          margin-left: 30px;
        }
        
        nav ul li a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        nav ul li a:hover {
          color: var(--primary-color);
        }
        
        .hero {
          padding: 160px 0 120px;
          text-align: center;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('story-pattern.svg') repeat;
          opacity: 0.1;
          animation: slide 20s linear infinite;
        }
        
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        .hero h1 {
          font-family: 'Merriweather', serif;
          font-size: 56px;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .hero p {
          font-size: 24px;
          margin-bottom: 40px;
          font-weight: 300;
        }
        
        .cta-button {
          display: inline-block;
          background-color: white;
          color: var(--primary-color);
          padding: 15px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 18px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .features {
          padding: 100px 0;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 60px;
        }
        
        .feature {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .feature:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .feature img {
          width: 120px;
          height: 120px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        
        .feature:hover img {
          transform: scale(1.1);
        }
        
        .feature h3 {
          font-family: 'Merriweather', serif;
          font-size: 24px;
          margin-bottom: 15px;
          color: var(--primary-color);
        }
        
        .feature p {
          font-size: 16px;
          color: var(--light-text-color);
        }
        
        .testimonials {
          background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
          padding: 100px 0;
          color: white;
        }
        
        .testimonial {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .testimonial p {
          font-size: 24px;
          font-style: italic;
          margin-bottom: 20px;
        }
        
        .testimonial-author {
          font-weight: 600;
        }
        
        footer {
          background-color: var(--text-color);
          color: white;
          text-align: center;
          padding: 40px 0;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 36px;
          }
          .hero p {
            font-size: 18px;
          }
          nav ul {
            display: none;
          }
          .mobile-menu {
            display: block;
            font-size: 24px;
            color: var(--primary-color);
          }
        }
        
        /* Dark mode styles */
        body.dark-mode {
          --background-color: #1a1a1a;
          --text-color: #f0f0f0;
          --light-text-color: #a0a0a0;
        }
        
        body.dark-mode header {
          background: rgba(26, 26, 26, 0.8);
        }
        
        body.dark-mode .feature {
          background: #2a2a2a;
        }
      `}</style>

      <header>
        <div className="container header-content">
          <div className="logo">StoryTaxi</div>
          <nav>
            <ul>
              <li><Link href="#home"><a>Home</a></Link></li>
              <li><Link href="#stories"><a>Stories</a></Link></li>
              <li><Link href="#about"><a>About</a></Link></li>
              <li><Link href="#contact"><a>Contact</a></Link></li>
            </ul>
          </nav>
          <div className="mobile-menu">☰</div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <h1>Embark on Your AI-Powered Storytelling Journey</h1>
          <p>Craft unique narratives where your choices shape the adventure</p>
          <a href="#start" className="cta-button">Start Your Story</a>
        </div>
      </section>

      <section className="features" id="stories">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <img src="ai-storytelling.svg" alt="AI-Powered Storytelling" />
              <h3>AI-Powered Storytelling</h3>
              <p>Experience cutting-edge AI technology that adapts to your choices and creates unique narratives.</p>
            </div>
            <div className="feature">
              <img src="diverse-genres.svg" alt="Diverse Genres" />
              <h3>Diverse Genres</h3>
              <p>Explore a wide range of storytelling genres beyond traditional fantasy settings.</p>
            </div>
            <div className="feature">
              <img src="tracey-guide.svg" alt="Meet Tracey" />
              <h3>Meet Tracey, Your AI Guide</h3>
              <p>Let Tracey, our AI Game Master, guide you through your personalized storytelling adventure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="about">
        <div className="container">
          <div className="testimonial">
            <p>"StoryTaxi has revolutionized my storytelling experience. The AI-driven narratives are incredibly immersive and responsive to my choices. It's like having a personal storyteller available 24/7!"</p>
            <div className="testimonial-author">- Sarah J., Avid Reader</div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <p>&copy; 2023 StoryTaxi. All rights reserved. | Powered by AI | Your Journey, Your Story</p>
        </div>
      </footer>
    </div>
  );
}
