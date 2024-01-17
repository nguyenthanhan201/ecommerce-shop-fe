import { CssBaseline } from '@mui/material';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AdminLayout = ({ ...props }: any) => {
  // useAuth();
  // const theme = useTheme();
  // const _colors = tokens(theme.palette.mode);

  return (
    <>
      <CssBaseline />
      <div className='flex'>
        <Sidebar />
        <main className='h-full w-full'>
          <Topbar />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
