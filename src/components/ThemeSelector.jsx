// src/components/ThemeSelector.jsx
import React from 'react';
import { useLocalStorage } from '../hooks';

export function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const themes = ['light', 'dark', 'blue', 'green'];

  const themeStyles = {
    light: { backgroundColor: '#ffffff', color: '#000000' },
    dark: { backgroundColor: '#2d2d2d', color: '#ffffff' },
    blue: { backgroundColor: '#e3f2fd', color: '#1565c0' },
    green: { backgroundColor: '#e8f5e8', color: '#2e7d32' }
  };

  return (
    <div style={{
      ...themeStyles[theme],
      padding: '20px',
      borderRadius: '8px',
      margin: '20px',
      border: '2px solid #ccc'
    }}>
      <h3>🎨 Theme Selector</h3>
      <p>Current theme: <strong>{theme}</strong></p>
      <div style={{ marginTop: '15px' }}>
        {themes.map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            style={{
              margin: '5px',
              padding: '8px 16px',
              border: theme === themeName ? '2px solid #007acc' : '1px solid #ccc',
              backgroundColor: theme === themeName ? '#007acc' : '#f0f0f0',
              color: theme === themeName ? 'white' : 'black',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {themeName}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
        Your preference is saved automatically!
      </p>
    </div>
  );
}