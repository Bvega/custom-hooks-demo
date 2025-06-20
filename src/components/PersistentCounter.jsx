// src/components/PersistentCounter.jsx
import React from 'react';
import { useLocalStorage } from '../hooks';

export function PersistentCounter() {
  const [count, setCount] = useLocalStorage('counter', 0);

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      margin: '20px',
      textAlign: 'center',
      backgroundColor: '#fff5f5'
    }}>
      <h3>🔢 Persistent Counter</h3>
      <div style={{ fontSize: '2rem', margin: '20px 0', color: '#ff6b6b' }}>
        {count}
      </div>
      <div>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
      <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
        This counter persists even after page refresh!
      </p>
    </div>
  );
}