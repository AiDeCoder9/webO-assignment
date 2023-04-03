import React, { ReactElement } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

interface Props {
  name: string;
  touched: { [key: string]: any | undefined };
  errors: { [key: string]: any | undefined };
  index?: number;
  keyName?: string;
}

function ValidationError(props: Props): ReactElement {
  const { name, touched, errors } = props;

  return touched?.[name] && !!errors?.[name] ? (
    <div className="form-error_message">
      <AiFillInfoCircle />
      <span> {errors[name] ? errors[name] : ''}</span>
    </div>
  ) : (
    <></>
  );
}

export default ValidationError;
