import React from 'react';
import { useWindowSize } from '../hooks';

export function WindowSizeDisplay() {
  const { width, height } = useWindowSize();

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007acc', 
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto',
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ color: '#007acc', marginBottom: '15px' }}>
        🪟 Window Size Tracker
      </h2>
      <div style={{ fontSize: '18px', marginBottom: '10px' }}>
        <strong style={{color: '#333'}}>Width:</strong> 
        <span style={{ 
          color: '#007acc', 
          fontFamily: 'monospace',
          marginLeft: '10px',
          fontSize: '20px'
        }}>
          {width}px
        </span>
      </div>
      <div style={{ fontSize: '18px', marginBottom: '15px' }}>
        <strong style={{color: '#333'}}>Height:</strong> 
        <span style={{ 
          color: '#007acc', 
          fontFamily: 'monospace',
          marginLeft: '10px',
          fontSize: '20px'
        }}>
          {height}px
        </span>
      </div>
      <p style={{ 
        fontStyle: 'italic', 
        color: '#666',
        fontSize: '14px'
      }}>
        ✨ Try resizing your browser window to see the magic!
      </p>
    </div>
  );
}