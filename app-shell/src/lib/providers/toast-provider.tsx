import { Cancel, CheckCircle, Info, WarningOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { createContext, ReactNode, useContext } from 'react';
import {
  toast as toastify,
  ToastContainer,
  ToastContent,
  ToastOptions,
  Zoom
} from 'react-toastify';

import Loading from '@/components/shared/Loading/Loading';

const ToastContext = createContext<{
  default: (content: ToastContent, options?: ToastOptions | undefined) => void;
  success: (content: ToastContent, options?: ToastOptions | undefined) => void;
  error: (content: ToastContent, options?: ToastOptions | undefined) => void;
  promise: (
    contentSuccess: ToastContent,
    func: Promise<any>,
    contentError: ToastContent,
    options?: ToastOptions | undefined
  ) => void;
}>(null!);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const defaultOptions: ToastOptions = {
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    pauseOnFocusLoss: false,
    bodyClassName: 'font-medium',
    closeButton: false,
    icon: false,
    toastId: 'toast',
    theme: theme.palette.mode
  };
  const icons = {
    info: <Info />,
    success: <CheckCircle sx={{ fontSize: '60px', color: 'green' }} />,
    error: <Cancel className='text-red-500' />,
    warn: <WarningOutlined />,
    loading: <Loading />
  };

  const createToastContent = (
    type: 'info' | 'success' | 'error' | 'warn' | 'loading',
    content?: ToastContent
  ) => (
    <div className='flex flex-col items-center p-4'>
      <i>{icons[type]}</i>
      {content !== '' ? <div className='mt-5'>{content as ReactNode}</div> : <></>}
    </div>
  );

  const toast = {
    default: (content: ToastContent, options?: ToastOptions) =>
      toastify(content, { ...defaultOptions, ...options }),
    success: (content: ToastContent, options?: ToastOptions) =>
      toastify.success(createToastContent('success', content), {
        className: '',
        ...defaultOptions,
        ...options
      }),
    error: (content: ToastContent, options?: ToastOptions) =>
      toastify.error(createToastContent('error', content), {
        className: 'text-red-500',
        ...defaultOptions,
        ...options
      }),
    promise: (
      content: ToastContent,
      func: Promise<any>,
      contentError?: ToastContent,
      options?: ToastOptions
    ) =>
      toastify.promise(
        func,
        {
          pending: {
            render() {
              return createToastContent('loading', 'Đang tải...');
            },
            icon: false
          },
          success: {
            render() {
              return createToastContent('success', content);
            },
            icon: false
          },
          error: {
            render({ data }: any) {
              // console.log("👌 ~ data", data);
              // When the promise reject, data will contains the error
              return createToastContent('error', data?.message || contentError || 'Tải thất bại');
            },
            icon: false
          }
        },
        {
          ...defaultOptions,

          ...options
        }
      )
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer containerId='toast-root' limit={1} position='top-center' transition={Zoom} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
