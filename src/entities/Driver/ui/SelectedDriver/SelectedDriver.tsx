import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '@/shared/lib/hooks';

import { Layout, LicensePlate } from './styled';

export const SelectedDriver = () => {
  const driver = useAppSelector((state) => state.selectedDriver);

  return (
    <Layout>
      <Typography variant="h6">Подходящий экипаж:</Typography>
      <Card>
        {driver.value && (
          <CardContent>
            <Typography variant="body1" component="div">
              {driver.value?.car_mark} {driver.value?.car_model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {driver.value?.car_color}
            </Typography>
            <LicensePlate>{driver.value.car_number}</LicensePlate>
          </CardContent>
        )}
      </Card>
    </Layout>
  );
};

export default SelectedDriver;
