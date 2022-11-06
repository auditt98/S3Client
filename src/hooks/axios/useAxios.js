import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { AxiosInstanceProvider } from '../../context-components/AxiosInstanceProvider';

/**
 * @param {string} [url = '']
 * @param {string} [method='GET']
 * @param {*} payload
 * @param {boolean} [autoRun=true]
 * @param {*} [config]
 * @return {*}
 */
export const useAxios = (url, method = 'GET', payload, autoRun = true, config = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [loaded, setLoaded] = useState(false);

	const authHeader = useAuthHeader();

	const contextInstance = useContext(AxiosInstanceProvider);
	const instance = useMemo(() => {
		return contextInstance || axios;
	}, [contextInstance]);
	const controllerRef = useRef(new AbortController());
	const cancel = () => {
		clearTimeout(interval.current);
		controllerRef.current.abort();
	};

	const refetch = async () => {
		try {
			let requestData = {
				signal: controllerRef.current.signal,
				data: payload,
				method,
				url,
				...config,
			};
			if (authHeader) {
				requestData.headers = {
					...requestData.headers,
					Authorization: authHeader,
				};
			}
			console.log('requestData', requestData);
			const response = await instance.request(requestData);
			setData(response.data);
		} catch (e) {
			if (axios.isCancel(e)) {
				return;
			}
			setError(error.message);
		} finally {
			setLoaded(true);
		}
	};

	useEffect(() => {
		if (!autoRun) {
			return;
		}
		refetch();
	}, []);

	return { cancel, data, error, loaded, refetch };
};
