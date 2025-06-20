# Complete Custom Hooks Tutorial

A comprehensive step-by-step guide to building custom React hooks from scratch, including `useWindowSize` and `useLocalStorage`.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Project Structure](#project-structure)
4. [Building useWindowSize Hook](#building-usewindowsize-hook)
5. [Building useLocalStorage Hook](#building-uselocalstorage-hook)
6. [Creating Demo Components](#creating-demo-components)
7. [Testing and Debugging](#testing-and-debugging)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting this tutorial, you should have:

- Basic knowledge of React and React Hooks
- Node.js (v16 or higher) installed
- npm or yarn package manager
- Code editor (VS Code recommended)
- Basic understanding of JavaScript ES6+

**Required React Knowledge:**
- `useState` hook
- `useEffect` hook
- Component lifecycle
- Event handling

---

## Project Setup

### Step 1: Create a New React Project

```bash
# Create new Vite React project
npm create vite@latest custom-hooks-demo -- --template react
cd custom-hooks-demo
npm install
```

### Step 2: Clean Up the Project

Remove unnecessary files and clean up the project structure:

```bash
# Remove unnecessary files
rm src/App.css
rm src/index.css
```

### Step 3: Test the Setup

```bash
npm run dev
```

Open `http://localhost:5173` to verify the project is running.

---

## Project Structure

### Step 1: Create Folder Structure

Create the following directories in your `src` folder:

```bash
mkdir src/hooks
mkdir src/components
```

### Step 2: Final Structure

Your project should look like this:

```
custom-hooks-demo/
├── src/
│   ├── hooks/
│   │   ├── useWindowSize.js
│   │   ├── useLocalStorage.js
│   │   └── index.js
│   ├── components/
│   │   ├── WindowSizeDisplay.jsx
│   │   └── ThemeSelector.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

---

## Building useWindowSize Hook

### Step 1: Understanding the Requirements

The `useWindowSize` hook should:
- Return current window width and height
- Update automatically when window is resized
- Clean up event listeners when component unmounts
- Handle initial state properly

### Step 2: Create the Hook File

Create `src/hooks/useWindowSize.js`:

```javascript
import { useState, useEffect } from 'react';

export function useWindowSize() {
  // Initialize state with current window size
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect runs only on mount

  return windowSize;
}
```

### Step 3: Understanding the Code

**Key Concepts:**

1. **useState Initialization**: We use a function to initialize state with current window size
2. **useEffect**: Sets up and cleans up the resize event listener
3. **Event Listener**: Responds to window resize events
4. **Cleanup**: Removes event listener to prevent memory leaks
5. **Return Value**: Returns an object with width and height

### Step 4: Create Display Component

Create `src/components/WindowSizeDisplay.jsx`:

```javascript
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
        <strong>Width:</strong> 
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
        <strong>Height:</strong> 
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
```

---

## Building useLocalStorage Hook

### Step 1: Understanding localStorage

**localStorage Features:**
- Stores data as strings
- Data persists until explicitly cleared
- Synchronous API
- Can throw errors (storage quota, privacy mode)
- Requires JSON serialization for objects

### Step 2: Hook Requirements

The `useLocalStorage` hook should:
- Accept a key and initial value
- Return current value and setter function
- Automatically sync with localStorage
- Handle JSON serialization/deserialization
- Provide error handling
- Work like useState

### Step 3: Create the Hook

Create `src/hooks/useLocalStorage.js`:

```javascript
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

### Step 4: Understanding the Code

**Key Concepts:**

1. **Lazy Initial State**: Using a function for useState initialization
2. **Error Handling**: Try-catch blocks for localStorage operations
3. **JSON Handling**: Automatic serialization/deserialization
4. **Function Support**: setValue accepts functions like useState
5. **localStorage Sync**: Automatic synchronization with browser storage

### Step 5: Create Theme Selector Component

Create `src/components/ThemeSelector.jsx`:

```javascript
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
```

---

## Creating Demo Components

### Step 1: Create Hooks Index File

Create `src/hooks/index.js`:

```javascript
// Export all hooks from this barrel file
export { useWindowSize } from './useWindowSize';
export { useLocalStorage } from './useLocalStorage';
```

**Benefits of Barrel Exports:**
- Clean imports: `import { useWindowSize } from './hooks'`
- Easy to maintain and expand
- Single source of truth for hook exports

### Step 2: Update Main App Component

Update `src/App.jsx`:

```javascript
import React from 'react';
import { WindowSizeDisplay } from './components/WindowSizeDisplay';
import { ThemeSelector } from './components/ThemeSelector';

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
```

---

## Testing and Debugging

### Step 1: Testing useWindowSize

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test resize functionality:**
   - Resize browser window
   - Open/close developer tools
   - Verify numbers update in real-time

3. **Check for memory leaks:**
   - Open React Developer Tools
   - Look for proper component unmounting

### Step 2: Testing useLocalStorage

1. **Test theme persistence:**
   - Select different themes
   - Refresh the page (F5)
   - Verify theme persists

2. **Check localStorage in DevTools:**
   - F12 → Application → Local Storage
   - Verify key-value pairs are stored
   - Check JSON format

3. **Test error handling:**
   - Try in private/incognito mode
   - Check console for error messages

### Step 3: Common Testing Scenarios

**Window Resize Testing:**
- Different screen sizes
- Mobile device simulation
- Zoom in/out testing

**localStorage Testing:**
- Clear localStorage and refresh
- Test with different data types
- Test with large data sets

---

## Best Practices

### 1. Hook Design Principles

**✅ Do:**
- Keep hooks focused on single responsibility
- Use descriptive names (useWindowSize, not useWS)
- Handle cleanup properly
- Provide consistent APIs
- Include error handling

**❌ Don't:**
- Mix unrelated logic in one hook
- Forget to clean up side effects
- Ignore error cases
- Break hooks rules

### 2. Performance Considerations

```javascript
// Good: Lazy initial state
const [value, setValue] = useState(() => expensiveCalculation());

// Bad: Runs on every render
const [value, setValue] = useState(expensiveCalculation());
```

### 3. Error Handling Patterns

```javascript
// Always wrap localStorage in try-catch
try {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
} catch (error) {
  console.error('localStorage error:', error);
  return defaultValue;
}
```

### 4. TypeScript Support (Optional)

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Cannot read property 'innerWidth' of undefined"

**Problem:** Server-side rendering or testing environment

**Solution:**
```javascript
const [windowSize, setWindowSize] = useState({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
});
```

#### Issue 2: localStorage not working in private mode

**Problem:** Some browsers disable localStorage in private mode

**Solution:** Already handled in our error handling

#### Issue 3: Memory leaks with event listeners

**Problem:** Forgot to remove event listeners

**Solution:** Always return cleanup function from useEffect

#### Issue 4: JSON parsing errors

**Problem:** Invalid JSON in localStorage

**Solution:** Use try-catch and fallback to initial value

### Debugging Tools

1. **React Developer Tools**
   - Hook state inspection
   - Component re-render tracking

2. **Browser DevTools**
   - Console for error messages
   - Application tab for localStorage
   - Network tab for performance

3. **Useful Console Commands**
   ```javascript
   // Clear localStorage
   localStorage.clear();
   
   // Check specific key
   localStorage.getItem('theme');
   
   // Check all keys
   Object.keys(localStorage);
   ```

---

## Extending the Project

### Additional Hooks to Implement

1. **useFetch Hook**
   ```javascript
   const { data, loading, error } = useFetch('/api/users');
   ```

2. **useDebounce Hook**
   ```javascript
   const debouncedValue = useDebounce(inputValue, 500);
   ```

3. **useToggle Hook**
   ```javascript
   const [isOpen, toggleOpen] = useToggle(false);
   ```

### Project Enhancements

- Add TypeScript support
- Add unit tests with Jest
- Add component testing with React Testing Library
- Add Storybook for component documentation
- Add CI/CD pipeline

---

## Conclusion

You've successfully built two essential custom hooks:

1. **useWindowSize**: Demonstrates event handling and cleanup
2. **useLocalStorage**: Shows data persistence and error handling

These patterns can be applied to create many other useful hooks. The key principles are:

- Single responsibility
- Proper cleanup
- Error handling
- Consistent APIs
- Reusability

**Next Steps:**
- Practice building more hooks
- Contribute to open-source hook libraries
- Share your hooks with the community

Happy coding! 🚀