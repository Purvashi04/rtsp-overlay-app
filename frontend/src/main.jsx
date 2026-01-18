import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

function App() {
  return <h1 style={{ color: "green" }}>React Loaded Successfully</h1>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
