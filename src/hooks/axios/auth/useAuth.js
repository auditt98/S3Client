import React, { useState, useEffect } from 'react';
import { API } from '../../../constants/constants';
import { useAxios } from '../useAxios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
	const { cancel, data, error, loading, execute } = useAxios(API.ADMIN.AUTH.LOGIN, 'POST', false);
	const navigate = useNavigate();
	const signIn = useSignIn();
	const login = async (params) => {
		let result = await execute(params);
		console.log('result', result);
		if (result && result.data && result.data.data) {
			if (
				signIn({
					token: result.data.data.token,
					tokenType: 'Bearer',
					authState: result.data.data.user,
					expiresIn: 10080,
				})
			) {
				//use navigate
				navigate('/');
			} else {
				throw new Error('Error logging in');
			}
		}
	};
	return { login, data, error };
};
