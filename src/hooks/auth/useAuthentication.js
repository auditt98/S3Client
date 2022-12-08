import React from 'react';
import { API, Auth } from 'aws-amplify';
import awsConfig from '../../aws-exports';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentRegionList, currentUserState } from '../../stores/user-store';
import { useS3 } from '../storage/useS3';

export const useAuthentication = () => {
	const navigate = useNavigate();
	const [currentRegions, setCurrentRegions] = useRecoilState(currentRegionList);
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const { getRegions } = useS3();
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

	const syncCurrentUser = async () => {
		let authenticatedUser = await Auth.currentAuthenticatedUser();
		try {
			let transformedUser = {
				id: authenticatedUser.username,
				email: authenticatedUser.attributes.email,
				username: authenticatedUser.username,
			};
			let synchedUser = { ...transformedUser };
			if (!currentUser.accessKeyId || !currentUser.secretAccessKey) {
				let userDB = await API.get(
					awsConfig.aws_cloud_logic_custom[0].name,
					`/users/${transformedUser.username}/${transformedUser.email}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `${authenticatedUser.signInUserSession.idToken.jwtToken}`,
						},
					}
				);
				if (userDB && userDB.data && userDB.data.Item) {
					let userData = userDB.data.Item;
					synchedUser = { ...transformedUser, ...userData };
				}
			}
			if (currentRegions.length === 0) {
				getRegions();
			}
			setCurrentUser(synchedUser);
		} catch (e) {
			console.log(Object.entries(e));
		}
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
		syncCurrentUser,
	};
};
