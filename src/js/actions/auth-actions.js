export const OPEN_AUTH = 'OPEN_AUTH';
export const CLOSE_AUTH = 'CLOSE_AUTH';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

const apiPrefix = `${process.env.REACT_APP_API_HOST}/api`;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

export const openAuth = () => ({
  type: OPEN_AUTH
});

export const closeAuth = () => ({
  type: CLOSE_AUTH
})

export const getToken = code => ({
  type: SET_TOKEN,
  payload: fetch(`${apiPrefix}/auth?redirect_uri=${redirectUri}&code=${code}`).then(r => r.json())
})

export const clearToken = () => ({
  type: CLEAR_TOKEN
});
