import React from 'react';
import { Spinner as RSpinner, SpinnerProps } from 'reactstrap';
export default function Spinner(props: SpinnerProps) {
  return <RSpinner {...props} color="primary" className="d-block mx-auto" />;
}
