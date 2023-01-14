import jwtDecode from 'jwt-decode';
import nookies, { parseCookies, destroyCookie } from 'nookies';

export const getStorageUser = () => {
  const cookies = parseCookies();
  let userData;
  try {
    userData = JSON.parse(cookies.assetStackAdmin);
    return userData;
  } catch (error) {}
};

export const getAccessToken = () => {
  const accessToken = getStorageUser()?.access_token;
  return accessToken ? accessToken : null;
};

export const getDecodedToken = (token: string | null) => {
  if (!token) return null;
  return jwtDecode(token);
};

export const checkTokenExpiration = (token: string | null) => {
  const decodedToken: any = getDecodedToken(token);
  const currentTime = parseInt(String(new Date().getTime() / 1000));
  const tokenExpirationTime = decodedToken?.exp;
  if (tokenExpirationTime) {
    return currentTime < tokenExpirationTime;
  }
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (token !== undefined && Boolean(token)) {
    return checkTokenExpiration(token);
  }
  return false;
};

export const clearCommitmentData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('commitmentDetail');
  }
};

export const serverSideLogOut = (context: any) => {
  nookies.destroy(context, 'user');
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
    props: {},
  };
};

export const isServerSideAuthenticated = (context: any) => {
  try {
    const cookies = parseCookies(context);
    let user: any = {};
    let userData = JSON.parse(cookies.assetStackAdmin);
    user = userData?.user;
    const access_token = userData?.access_token;
    let isAuth = false;
    if (access_token !== undefined && Boolean(access_token)) {
      const decodedToken: any = jwtDecode(access_token);
      const currentTime = parseInt(String(new Date().getTime() / 1000));
      const tokenExpirationTime = decodedToken?.exp;
      isAuth = currentTime < tokenExpirationTime;
    }
    return { isAuth, user, access_token };
  } catch (error) {
    return { isAuth: false, user: {} };
  }
};

// Logout
export const Logout = () => {
  destroyCookie(null, 'user', { path: '/' });
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

export const userProtectedRoutes = (context: any) => {
  const { user, isAuth, access_token } = isServerSideAuthenticated(context);

  if (isAuth) {
    return {
      props: { user, access_token },
    };
  } else {
    return serverSideLogOut(context);
  }
};
