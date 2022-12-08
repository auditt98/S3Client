import React, { useEffect } from 'react';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../stores/user-store';

export function RequireAuthentication({ children }) {
	const { checkIsAuthenticated, syncCurrentUser } = useAuthentication();
	const navigate = useNavigate();
	const location = useLocation();
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isAuthenticated = await checkIsAuthenticated();
				if (!isAuthenticated) {
					setIsAuthenticated(false);
					//check if route is not /login
					if (location.pathname !== '/login') {
						navigate('/login');
						setCurrentUser({});
					}
				} else {
					setIsAuthenticated(true);
					syncCurrentUser();
				}
			} catch (error) {
				setIsAuthenticated(false);
				if (location.pathname !== '/login') {
					navigate('/login');
					setCurrentUser({});
				}
			}
		};
		checkAuth();
		return () => {
			// Cleanup function
		};
	}, [location.pathname]);
	return isAuthenticated ? children : null;
}
