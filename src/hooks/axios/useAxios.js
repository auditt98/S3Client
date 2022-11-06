import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { AxiosInstanceProvider } from '../../context-components/AxiosInstanceProvider';
import { API } from '../../constants/constants';
axios.defaults.baseURL = API.BASE_URL;

/**
 * @param {string} [url = '']
 * @param {string} [method='GET']
 * @param {boolean} [autoRun=true]
 * @param {*} [config]
 * @return {*} [cancel(), data, error, loading, execute()]
 */
export const useAxios = (url, method = 'GET', autoRun = true, config = {}) => {
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

	const execute = async (payload) => {
		try {
			let requestData = {
				signal: controllerRef.current.signal,
				data: payload,
				method,
				url,
				...config,
			};
			if (authHeader()) {
				requestData.headers = {
					...requestData.headers,
					Authorization: authHeader(),
				};
			}
			const response = await instance.request(requestData);
			setData(response.data);
			return response;
		} catch (e) {
			if (axios.isCancel(e)) {
				return;
			}
			setError(e);
			throw e;
		} finally {
			setLoaded(true);
		}
	};

	useEffect(() => {
		if (!autoRun) {
			return;
		}
		execute();
	}, []);

	return { cancel, data, error, loaded, execute };
};
