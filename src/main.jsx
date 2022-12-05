import React from 'react';
import './i18n.js';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/app.css';
import './assets/css/custom.scss';
import { I18nextProvider } from 'react-i18next';
const container = document.getElementById('root');
const root = createRoot(container);
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
API.configure(awsconfig);

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
