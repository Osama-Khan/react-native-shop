import React from 'react';
import {Button} from 'react-native-paper';

const LoadingSpinner = (props: any) => {
  return <Button {...props} loading={true} />;
};

export default LoadingSpinner;
