import React from 'react';
import { WindowSizeDisplay } from './components/WindowSizeDisplay';
import { ThemeSelector } from './components/ThemeSelector';
import './App.css';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#333',
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          🎣 Custom Hooks Demo
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1.1rem'
        }}>
          Testing useWindowSize and useLocalStorage hooks
        </p>
      </div>
      
      <WindowSizeDisplay />
      <ThemeSelector />
    </div>
  );
}

export default App;