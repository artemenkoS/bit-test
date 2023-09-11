import { LocalTaxi } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import { Driver, setSelectedDriver } from '@/entities/Driver/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';

interface DriversListProps {
  drivers: Driver[];
}

export const DriversList: React.FC<DriversListProps> = ({ drivers }) => {
  const dispatch = useAppDispatch();
  const selectedDriver = useAppSelector((state) => state.selectedDriver);

  const handleDriverSelect = (value: Driver) => {
    dispatch(setSelectedDriver(value));
  };

  /* TODO */
  const metersToKilometers = (distanceInMeters: number) => {
    if (distanceInMeters >= 1000) {
      return (distanceInMeters / 1000).toFixed(1) + ' км';
    }
    return distanceInMeters + ' м';
  };

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', marginLeft: 1, overflow: 'auto' }}>
      <List dense>
        {drivers.map((driver: Driver) => (
          <ListItem disablePadding key={driver.crew_id}>
            <ListItemButton
              selected={selectedDriver.value?.crew_id === driver.crew_id}
              onClick={() => handleDriverSelect(driver)}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <LocalTaxi />
              </ListItemIcon>
              <ListItemText primary={`${driver.car_mark} ${driver.car_model}`} secondary={driver.car_color} />
              <ListItemText sx={{ textAlign: 'right' }} secondary={metersToKilometers(driver.distance)}>
                <KeyboardArrowRightIcon />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
