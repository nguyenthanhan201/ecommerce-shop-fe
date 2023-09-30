import { setCookie } from '@/lib/hooks/useCookie';
import { AuthServices } from '@/lib/repo/auth.repo';

import { authentication } from '../../../config/firebase.config';

const LoginPage = () => {
  const googleSignIn = async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');

    await signInWithPopup(authentication, new GoogleAuthProvider())
      .then(async (result) => {
        await AuthServices.login(result.user.email!, result.user.displayName!)
          .then((res) => {
            setCookie('token', res.access_token, {
              // 2 day
              expires: new Date(Date.now() + 2 + 24 * 60 * 60 * 1000),
            });
            setCookie('refreshToken', res.refresh_token, {
              // 7 days
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            window.location.replace('/');
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      })
      .catch((err) => {
        alert('Đăng nhập thất bại');
        console.log(err);
      });
  };

  return (
    <div className='form-login'>
      <img alt='yolo-gif' loading='lazy' src='/images/gifs/ezgif.com-gif-maker.webp' />
      <div className='form-login__left'>
        <img alt='logo' src='/images/Logo-2.png' />
        <button className='btn btn-google' onClick={googleSignIn} type='button'>
          <i className='bx bxl-google' /> <p>Đăng nhập với google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
