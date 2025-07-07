import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Projects from './components/Projects/Projects';
import WelcomeLoader from './components/Animations/WelcomeLoader';
import MinimalBackground from './components/Animations/MinimalBackground';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('portfolio');
  const [isLoading, setIsLoading] = useState(true);

  // Ваша информация
  const userInfo = {
    username: 'RanchesW',
    fullName: 'Alikhan',
    email: 'alikhan@ranchesw.com',
    bio: 'Passionate designer and developer creating digital experiences'
  };

  useEffect(() => {
    // Показываем welcome анимацию 3 секунды
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const navigate = (view) => {
    setCurrentView(view);
  };

  if (isLoading) {
    return <WelcomeLoader username={userInfo.username} fullName={userInfo.fullName} />;
  }

  return (
    <div className="app">
      <MinimalBackground />
      
      <Navigation 
        currentView={currentView}
        onNavigate={navigate}
        user={userInfo}
      />

      {currentView === 'portfolio' && (
        <Portfolio user={userInfo} />
      )}

      {currentView === 'about' && (
        <About user={userInfo} />
      )}

      {currentView === 'projects' && (
        <Projects user={userInfo} />
      )}

      {currentView === 'contact' && (
        <Contact user={userInfo} />
      )}
    </div>
  );
}

export default App;