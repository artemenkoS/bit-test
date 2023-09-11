import { Button } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { setValues } from '@/entities/Address/model';
import { OrderData } from '@/entities/Order/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { SOURCE_TIME_FORMAT } from '@/shared/model/const';

type Props = {
  isDisabled: boolean;
};

export const CreateOrder: FC<Props> = ({ isDisabled }) => {
  const dispatch = useAppDispatch();
  const addressState = useAppSelector((state) => state.address);
  const driver = useAppSelector((state) => state.selectedDriver);

  const handleCreateOrder = useCallback(() => {
    if (!addressState.address || !driver.value) {
      dispatch(setValues({ isValid: false }));
      return;
    }

    const sourceTime = dayjs(new Date()).format(SOURCE_TIME_FORMAT);
    if (addressState.isValid && addressState.coords && driver.value) {
      const order: OrderData = {
        addresses: [
          {
            address: addressState.address,
            lon: addressState.coords[0],
            lat: addressState.coords[1],
          },
        ],
        crew_id: driver.value?.crew_id,
        source_time: sourceTime,
      };

      axios
        .post('/order', order)
        .then(() => {
          toast('Заказ успешно создан, водитель едет к Вам.');
        })
        .catch(() => {
          toast('Что-то пошло не так.');
        });
    }
  }, [addressState, driver]);

  return (
    <Button fullWidth disabled={isDisabled || !addressState.isValid} variant="outlined" onClick={handleCreateOrder}>
      Заказать
    </Button>
  );
};

export default CreateOrder;
