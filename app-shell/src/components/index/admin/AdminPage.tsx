import { Box } from '@mui/material';

import Header from '@/components/index/admin/components/Header';

const AdminPage = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Header subtitle='Welcome to your dashboard' title='DASHBOARD' />
      </Box>
      {/* GRID & CHARTS */}
      {/* <Box display='grid' gridTemplateColumns='repeat(12, 1fr)' gridAutoRows='140px' gap='20px'>
        <Box
          gridColumn='span 3'
          bgcolor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title='12,361'
            subtitle='Emails Sent'
            progress='0.75'
            increase='+14%'
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          bgcolor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title='431,225'
            subtitle='Sales Obtained'
            progress='0.50'
            increase='+21%'
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          bgcolor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title='32,441'
            subtitle='New Clients'
            progress='0.30'
            increase='+5%'
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          gridColumn='span 3'
          bgcolor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title='1,325,134'
            subtitle='Traffic Received'
            progress='0.80'
            increase='+43%'
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
      </Box> */}
    </Box>
  );
};

export default AdminPage;
