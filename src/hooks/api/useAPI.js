import React from 'react';
import { API, Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentRegionList, currentUserState } from '../../stores/user-store';
import { useS3 } from '../storage/useS3';

export const useAPI = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

	const updateUser = async (params) => {
		try {
			let user = { ...currentUser, ...params };
			let result = await API.post('s3cUserAPI', `/users/${currentUser.id}/${currentUser.email}`, {
				body: user,
			});
			if (result && result.success) {
				setCurrentUser(user);
				return result;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		updateUser,
	};
};
