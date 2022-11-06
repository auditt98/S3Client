import React, { useState, useEffect } from 'react';
import { API } from '../../../constants/constants';
import useAxios from 'axios-hooks';

export const useAuth = (params) => {
	const [{ data, loading, error }, executeLogin] = useAxios(
		{
			url: API.AUTH.LOGIN,
			method: 'POST',
			data: params,
		},
		{
			manual: true,
		}
	);
	const login = async () => {
		await executeLogin();
	};
	return { login, data, error };
};
