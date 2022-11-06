import React from 'react';
import ScrollToTop from '@/base-components/scroll-to-top/Main';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Router from './router';
import { AuthProvider } from 'react-auth-kit';
// import { AxiosInstanceProvider } from './context-components/AxiosInstanceProvider';
// import { API } from './constants/constants';
// import i18next from 'i18next';

function App() {
	return (
		<RecoilRoot>
			<AuthProvider authType={'localstorage'} authName={'_auth'}>
				<BrowserRouter>
					<Router />
					<ScrollToTop />
				</BrowserRouter>
			</AuthProvider>
		</RecoilRoot>
	);
}

export default App;
