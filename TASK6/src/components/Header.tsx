import React from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="header" role="banner">
      <div className="logo">Timeline App</div>
      <label className="switch" htmlFor="theme-toggle">
        <input
          id="theme-toggle"
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Toggle dark theme"
        />
        <span className="slider round"></span>
      </label>
    </header>
  );
};

export default Header;
