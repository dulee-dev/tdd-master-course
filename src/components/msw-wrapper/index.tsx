'use client';

import React, { useEffect, useState } from 'react';
import { mock } from './tempt';

interface Props {
  className?: string;
  children?: React.ReactNode;
}
export const MswWrapper = (props: Props) => {
  const [enableMSW, setEnableMSW] = useState(false);

  useEffect(() => {
    const init = async () => {
      await mock();
      console.log('init');

      setEnableMSW(true);
    };
    if (!enableMSW) {
      init();
    }
  }, [enableMSW]);

  return !enableMSW ? null : <div>{props.children}</div>;
};
