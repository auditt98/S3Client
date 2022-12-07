import React from 'react';
import { API, Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = () => {
	const navigate = useNavigate();

	const signIn = async ({ email, password, ...params } = params) => {
		return await Auth.signIn(email, password);
	};

	const signUp = async ({ email, password, ...params } = params) => {
		return await Auth.signUp({
			username: email,
			password: password,
			attributes: {
				email: email,
			},
		});
	};

	const forgotPasswordSubmit = async ({ email, code, password, ...params } = params) => {
		console.log('forgotPasswordSubmit', email, code, password);
		return await Auth.forgotPasswordSubmit(email, code, password);
	};

	const forgotPassword = async ({ email, ...params } = params) => {
		return await Auth.forgotPassword(email);
	};

	const confirmSignUp = async ({ email, code, ...params } = params) => {
		return await Auth.confirmSignUp(email, code);
	};

	const resendSignUp = async ({ email, ...params } = params) => {
		return await Auth.resendSignUp(email);
	};

	const checkIsAuthenticated = async () => {
		return await Auth.currentAuthenticatedUser();
	};

	const signOut = async () => {
		await Auth.signOut();
		navigate('/login');
	};
	return {
		signIn,
		signUp,
		confirmSignUp,
		resendSignUp,
		checkIsAuthenticated,
		signOut,
		forgotPassword,
		forgotPasswordSubmit,
	};
};
