import React from 'react';
import { WindowSizeDisplay } from './components/WindowSizeDisplay';
import { ThemeSelector } from './components/ThemeSelector';
import { UserList } from './components/UserList';
import { ContactForm } from './components/ContactForm';

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
          Testing useWindowSize, useLocalStorage, useFetch, and useForm hooks
        </p>
      </div>
      
      <WindowSizeDisplay />
      <ThemeSelector />
      <UserList />
      <ContactForm />
    </div>
  );
}

export default App;