import React from 'react';
import './i18n.js';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/app.css';
import './assets/css/custom.scss';
import { I18nextProvider } from 'react-i18next';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<App />
	// <I18nextProvider i18n={i18n}>
	// </I18nextProvider>
);
