// This file is the entry point for the application.
// It finds the root DOM element and initializes the app.
import { renderApp } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Start the vanilla JavaScript application
renderApp(rootElement);
