// eslint-disable-next-line simple-import-sort/imports
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Badge, useTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { LanguageTypes, MainNavTypes, contentHeader } from 'dictionaries/header';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';

import Img from '@/components/shared/Img/Img';
import { removeCookie } from '@/lib/hooks/useCookie';
import { AuthServices } from '@/lib/repo/auth.repo';

import { mainNav } from '../../utils/fake-data/header-navs';

const Menu = dynamic(() => import('./components/Menu'), { ssr: false });

const Defaultheader = () => {
  const theme = useTheme();
  const cartItems = useAppSelector((state) => state.cartItems, shallowEqual);
  const auth = useAppSelector((state) => state.auth.auth, shallowEqual);
  const router = useRouter();
  const activeNav = mainNav.findIndex((e) => e.path === router.pathname);
  const menuLeft = useRef<any>(null);
  const [headerShrink, setHeaderShrink] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        setHeaderShrink(true);
      } else {
        setHeaderShrink(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    const darkTheme = theme.palette.mode === 'dark';
    const root = document.documentElement;
    root?.style.setProperty('--main-bg', darkTheme ? '#262833' : '#fff');
    root?.style.setProperty('--main-color', darkTheme ? '#fff' : '#262833');
    root?.style.setProperty('--txt-second-color', darkTheme ? '#fff' : '#8d8d8d');
  }, [theme.palette.mode]);

  const menuToggle = useCallback(() => {
    menuLeft.current.classList.toggle('active');
  }, []);

  const handleLogout = useCallback(async () => {
    if (!auth?.email) return;
    const authentication = await import('../../config/firebase.config').then(
      (res) => res.authentication
    );
    const { signOut } = await import('firebase/auth');
    // const promise1 = await signOut(authentication);
    const promise2 = await AuthServices.logout(auth.email);

    await Promise.all([promise2])
      .then(async () => {
        await signOut(authentication);
        removeCookie('token');
        removeCookie('refreshToken');
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [auth?.email]);

  return (
    <div className={`header ${headerShrink && 'shrink'}`}>
      <div className='container'>
        <div className='header_menu'>
          <div className='header_menu_mobile-toggle' onClick={menuToggle} role='presentation'>
            <MenuIcon fontSize='inherit' />
          </div>
          <div className='header_menu_left' ref={menuLeft}>
            <div className='header_menu_left_close' onClick={menuToggle} role='presentation'>
              <KeyboardArrowLeftIcon fontSize='inherit' />
            </div>
            {mainNav.map((item, index) => (
              <div
                className={`header_menu_item header_menu_left_item ${
                  index === activeNav ? 'active' : ''
                }`}
                key={index}
                onClick={menuToggle}
                role='presentation'
              >
                <Link href={item.path}>
                  {/* <span>{t('mainNavs.' + item.name, '')}</span> */}
                  <span>
                    {
                      contentHeader.mainNavs[router.locale as LanguageTypes][
                        item.name as MainNavTypes
                      ]
                    }
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <Link className='header_logo' href='/'>
            <Img
              alt='Yolo'
              layout='fill'
              loading='eager'
              src='/images/Logo-2.png'
              style={{
                objectFit: 'contain'
              }}
            />
          </Link>
          <div className='header_menu_right'>
            <div className='header_menu_item header_menu_right_item'>
              <Tooltip title='Giỏ hàng'>
                <Link href='/cart'>
                  <Badge
                    badgeContent={cartItems.value ? Object.keys(cartItems.value).length : 0}
                    color='primary'
                  >
                    <LocalMallOutlinedIcon />
                  </Badge>
                </Link>
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              {auth ? (
                <>
                  <Avatar sx={{ width: 27, height: 27 }}>{auth.name?.charAt(0)}</Avatar>
                  <Menu handleLogout={handleLogout} />
                </>
              ) : (
                <Tooltip title='Đăng nhập'>
                  <Link href='/login'>
                    <LoginIcon />
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Defaultheader);
