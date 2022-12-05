import React, { useState, useEffect } from 'react';
import { API } from '../../constants/constants';
import { useAxios } from '../axios/useAxios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

export const useAuth = () => {
	const loginAPI = useAxios(API.AUTH.LOGIN, 'POST', false);
	const registerAPI = useAxios(API.AUTH.REGISTER, 'POST', false);
	const navigate = useNavigate();
	const signIn = useSignIn();
	const login = async (params) => {
		let result = await loginAPI.execute(params);
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

	const register = async (params) => {
		try {
			let result = await registerAPI.execute(params);
			let data = result.data;
			if (data && data.tokens && data.user) {
				let tokenExpireDate = DateTime.fromISO(data.tokens.access.expires);
				let refreshExpireDate = DateTime.fromISO(data.tokens.refresh.expires);
				let currentTime = DateTime.now();
				let diffMinutesAccessToken = tokenExpireDate.diff(currentTime, 'minutes').as('minutes');
				let diffMinutesRefreshToken = refreshExpireDate.diff(currentTime, 'minutes').as('minutes');
				if (
					signIn({
						tokenType: 'Bearer',
						token: data.tokens.access.token,
						expiresIn: diffMinutesAccessToken,
						authState: data.user,
						refreshToken: data.tokens.refresh.token,
						refreshTokenExpire: diffMinutesRefreshToken,
					})
				) {
					navigate('/');
				}
			}
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	};
	return { login, register, loginAPI, registerAPI };
};
