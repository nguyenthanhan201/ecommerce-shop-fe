import { useEffect } from 'react';

import { authentication } from '../../config/firebase.config';
import { isEmpty } from '../helpers/functions';
import { setAuthSlice } from '../redux/slices/auth';
import { AuthServices } from '../repo/auth.repo';
import { useAppDispatch } from './useAppDispatch';
import { getCookie, removeCookie } from './useCookie';

function useAuth() {
  const dispatch = useAppDispatch();

  const isLogined = !isEmpty(getCookie('token'));

  const handleGetUser = async () => {
    const _isLogined = !isEmpty(getCookie('token'));
    console.log('👌  isLogined:', _isLogined);
    const { onAuthStateChanged } = await import('firebase/auth');
    onAuthStateChanged(authentication, async (user) => {
      console.log('👌 ~ user', user);
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
              _id,
            }),
          );
        },
      );
      // .catch((err) => {
      //   if (err.response.status === 401) {
      //     AuthServices.refeshToken().then((res) => {
      //       console.log(res);
      //     });
      //   }
      //   // console.log('err', err.response.status);
      // });
    });
  };

  useEffect(() => {
    (async function unsubscribe() {
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
                _id,
              }),
            );
          },
        );
      });
    })();
  }, []);

  return {
    handleGetUser,
    isLogined,
  };
}

export default useAuth;
