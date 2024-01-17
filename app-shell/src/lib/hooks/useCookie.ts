import Cookies, { CookieAttributes } from 'js-cookie';

export enum CookiesKeys {
  'token' = 'token',
  'refreshToken' = 'refreshToken',
  'i18next' = 'i18next'
}

type CookiesValues = keyof typeof CookiesKeys;

export const getCookie = (name: CookiesValues) => {
  return JSON.parse(Cookies.get(name) || '{}');
};
export const setCookie = <T>(name: CookiesValues, value: T, options?: CookieAttributes) => {
  return Cookies.set(name, JSON.stringify(value), options);
};
export const removeCookie = (name: CookiesValues) => {
  return Cookies.remove(name);
};
export function getCookieExpirationTime(cookieName: CookiesValues) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      const cookieParts = cookie.split('=');
      // const cookieValue = decodeURIComponent(cookieParts[1]);
      const cookieOptions = cookieParts[2] ? cookieParts[2].split(';') : [];
      for (let j = 0; j < cookieOptions.length; j++) {
        const option = cookieOptions[j].trim();
        if (option.startsWith('expires=')) {
          const expiresValue = option.substring('expires='.length);
          return new Date(expiresValue).toUTCString();
        }
      }
    }
  }
  return null; // Cookie not found or expiration time not set
}

function useCookie(key: CookiesValues) {
  return {
    get: () => getCookie(key),
    set: (value: string, options?: CookieAttributes) => setCookie(key, value, options),
    remove: () => removeCookie(key),
    getExpirationTime: () => getCookieExpirationTime(key)
  };
}

export default useCookie;
