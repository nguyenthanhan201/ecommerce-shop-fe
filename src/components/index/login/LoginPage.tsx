import { AuthServices } from "@/lib/repo/auth.repo";
import { useRouter } from "next/router";
import { authentication } from "../../../config/firebase.config";

const LoginPage = () => {
  const router = useRouter();

  const googleSignIn = async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");

    await signInWithPopup(authentication, new GoogleAuthProvider())
      .then((result) => {
        AuthServices.login(result.user.email!, result.user.displayName!)
          .then((res) => {
            localStorage.setItem("token", res.access_token);
            router.replace("/");
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      })
      .catch((err) => {
        alert("Đăng nhập thất bại");
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
