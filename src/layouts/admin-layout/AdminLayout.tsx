import { CssBaseline } from '@mui/material';
import useAuth from 'lib/hooks/useAuth';

import RequiredAuth from '../required-auth/RequiredAuth';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = ({ ...props }: any) => {
  useAuth();
  // const theme = useTheme();
  // const _colors = tokens(theme.palette.mode);

  return (
    <RequiredAuth>
      <CssBaseline />
      <div className='flex'>
        <Sidebar />
        <main className='h-full w-full'>
          <Topbar />
          {props.children}
        </main>
      </div>
    </RequiredAuth>
  );
};

export default AdminLayout;
