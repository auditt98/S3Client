import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/app.css';
import './assets/css/custom.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
