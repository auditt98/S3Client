import React, { useEffect } from 'react';
import { useAuthentication } from '../../hooks/auth/useAuthentication';
import { useNavigate, useLocation } from 'react-router-dom';

export function RequireAuthentication({ children }) {
	const { checkIsAuthenticated } = useAuthentication();
	const navigate = useNavigate();
	const location = useLocation();

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
					}
				} else {
					setIsAuthenticated(true);
				}
			} catch (error) {
				setIsAuthenticated(false);
				if (location.pathname !== '/login') {
					navigate('/login');
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
