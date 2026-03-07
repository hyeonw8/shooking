import { useContext } from 'react';

import {
  PaymentsDispatchContext,
  PaymentsStateContext,
} from './PaymentsContext';

export const usePaymentsState = () => {
  const context = useContext(PaymentsStateContext);
  if (context === undefined) {
    throw new Error('usePaymentsState must be used within PaymentsProvider');
  }
  return context;
};

export const usePaymentsDispatch = () => {
  const context = useContext(PaymentsDispatchContext);
  if (context === undefined) {
    throw new Error('usePaymentsDispatch must be used within PaymentsProvider');
  }
  return context;
};
