import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { SelectedDriver } from '@/entities/Driver/ui/SelectedDriver/SelectedDriver';
import { SearchAddress } from '@/features/SearchAddress/ui/SearchAddress';
import { NewOrderForm } from '@/widgets/NewOrderForm/NewOrderForm';

/* TODO */
export const TaxiOrdering = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        padding: '24px',
        flexDirection: 'column',
        gap: '16px',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
        position="top-right"
        gutter={8}
      />
      <SearchAddress />
      <SelectedDriver />
      <NewOrderForm />
    </Box>
  );
};
