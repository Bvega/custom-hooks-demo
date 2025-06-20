# Custom Hooks Demo

A React application demonstrating the creation and usage of custom hooks, featuring window size tracking and localStorage synchronization.

## 🚀 Features

- **useWindowSize Hook**: Real-time window dimension tracking
- **useLocalStorage Hook**: Persistent data storage with browser localStorage
- **Theme Persistence**: User theme preferences saved across sessions
- **Clean Architecture**: Organized folder structure for hooks and components
- **Error Handling**: Robust error handling for localStorage operations

## 📦 Technologies

- React 18+
- Vite (Build tool)
- JavaScript ES6+
- CSS3
- HTML5

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/custom-hooks-demo.git
   cd custom-hooks-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
custom-hooks/
├── src/
│   ├── hooks/
│   │   ├── useWindowSize.js     # Window size tracking hook
│   │   ├── useLocalStorage.js   # localStorage synchronization hook
│   │   └── index.js             # Hooks barrel export
│   ├── components/
│   │   ├── WindowSizeDisplay.jsx # Window size demo component
│   │   └── ThemeSelector.jsx     # Theme selector demo component
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Application styles
│   └── main.jsx                  # Application entry point
├── public/
├── package.json
└── README.md
```

## 🎣 Custom Hooks

### useWindowSize

Tracks the current window dimensions and updates automatically on resize.

```javascript
const { width, height } = useWindowSize();
```

**Features:**
- Real-time updates on window resize
- Automatic event listener cleanup
- Returns width and height as pixels

### useLocalStorage

Synchronizes React state with browser localStorage for data persistence.

```javascript
const [value, setValue] = useLocalStorage('key', initialValue);
```

**Features:**
- Automatic localStorage synchronization
- JSON serialization/deserialization
- Error handling for localStorage failures
- Same API as useState

## 🚀 Usage Examples

### Basic Window Size Tracking
```javascript
import { useWindowSize } from './hooks';

function MyComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

### Theme Persistence
```javascript
import { useLocalStorage } from './hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

## 🧪 Testing the Hooks

1. **Window Size Hook:**
   - Resize your browser window
   - Watch the dimensions update in real-time

2. **localStorage Hook:**
   - Change the theme selection
   - Refresh the page
   - Verify the theme persists

3. **Developer Tools:**
   - Open DevTools → Application → Local Storage
   - See the stored values update automatically

## 📚 Learning Resources

- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Custom Hooks](https://reactjs.org/docs/hooks-custom.html)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing hooks API
- Vite team for the fast build tool
- The React community for custom hooks inspiration

## 📈 What's Next?

Consider adding these hooks to expand the library:
- `useFetch` - API call management
- `useDebounce` - Input debouncing
- `useToggle` - Boolean state toggling
- `useCounter` - Counter operations
- `useInterval` - Declarative intervals

---

**Built with ❤️ and React Hooks**