export const API = {
	BASE_URL: 'http://172.105.123.20:3000/v1',
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
	},
};

export const ERRORS = {
	UserNotFoundException: 'Invalid email or password',
	FallbackError: 'Something went wrong! Please try again later',
	UserNotConfirmedException: 'UserNotConfirmedException',
	CodeMismatchException: 'The code you entered is incorrect',
	LimitExceededException: 'You have exceeded the limit for this action, please try again later',
	NotAuthorizedException: 'NotAuthorizedException',
};
