import { useEffect } from 'react';

import { isEmpty } from '../helpers/assertion';
import { useToast } from '../providers/toast-provider';
import { setAuthSlice } from '../redux/slices/auth';
import { AuthServices } from '../repo/auth.repo';
import { useAppDispatch } from './useAppDispatch';
import { getCookie, removeCookie } from './useCookie';

function useAuth() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const isLogined = !isEmpty(getCookie('token'));

  useEffect(() => {
    (async function unsubscribe() {
      const authentication = await import('../../config/firebase.config').then(
        (res) => res.authentication
      );
      const { onAuthStateChanged } = await import('firebase/auth');
      onAuthStateChanged(authentication, (user) => {
        const _isLogined = !isEmpty(getCookie('token'));
        // console.log('👌  _isLogined:', _isLogined);
        // console.log('👌 ~ user', user);
        if (!user || !_isLogined) {
          removeCookie('token');
          removeCookie('refreshToken');
          return dispatch(setAuthSlice(undefined));
        }
        return AuthServices.getUserByEmail(String(user.displayName), String(user.email)).then(
          (res) => {
            const { name, email, _id } = res;
            dispatch(
              setAuthSlice({
                name,
                email,
                _id
              })
            );
          },
          (err) => {
            console.log('err', err);
            toast.error(err.message);
          }
        );
      });
    })();
  }, []);

  return {
    isLogined
  };
}

export default useAuth;
