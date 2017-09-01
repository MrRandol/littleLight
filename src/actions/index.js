export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login (userCredentials) {

	if ( userCredentials.username === 'test')  {
		alert("login ok");
		return {
			type: LOGIN_SUCCESS
		}
	} else {
		alert("login ok");
		return {
			type: LOGIN_FAILURE
		}
	}

}