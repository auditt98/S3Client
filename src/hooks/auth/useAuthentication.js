import React from 'react';
import { API, Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports';
import { useNavigate } from 'react-router-dom';
import { API as APIRoute } from '../../constants/constants';
import { DateTime } from 'luxon';

export const useAuthentication = () => {
	const signIn = async ({ email, password, ...params } = params) => {
		let loginResult = await Auth.signIn(email, password);
		console.log('loginResult', loginResult);
	};

	const signUp = async ({ email, password, ...params } = params) => {
		let result = await Auth.signUp({
			username: email,
			password: password,
			attributes: {
				email: email,
			},
		});
		console.log('registerResult', result);
	};

	const confirmSignUp = async ({ email, code, ...params } = params) => {
		let result = await Auth.confirmSignUp(email, code);
		console.log('confirmSignUpResult', result);
	};

	const checkIsAuthenticated = async () => {
		return await Auth.currentAuthenticatedUser();
	};
	return { signIn, signUp, confirmSignUp, checkIsAuthenticated };
};
