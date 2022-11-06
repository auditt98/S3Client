import React, { useState, useEffect } from 'react';
import { API } from '../../../constants/constants';
import { useAxios } from '../useAxios';

export const useAuth = () => {
	const { cancel, data, error, loading, execute } = useAxios(API.ADMIN.AUTH.LOGIN, 'POST', false);
	const login = async (params) => {
		await execute(params);
	};
	return { login, data, error };
};
