//urls
export const API_BASE_URL = 'http://localhost:8080';
//export const OAUTH2_REDIRECT_URI = 'http://localhost:80/oauth2/redirect'
//export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
//User things
export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_USER_ROLE="currentUserRole";
export const USER_EMAIL="user-email";
export const USER_NAME="user-name";
export const USER_ID="user-id";
export const USER_THEME="user-theme";
export const USER_LANGUAGE="user_language";


