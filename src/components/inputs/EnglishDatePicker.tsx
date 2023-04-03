import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateProps extends ReactDatePickerProps {
  className?: string;
  wrapperClassName?: string;
  label?: string;
  hasError?: boolean;
}
const EnglishDatePicker = (props: DateProps) => {
  const { id, className, wrapperClassName = '', label, value, ...args } = props;

  return (
    <div className="form-group">
      <label htmlFor="">{label}</label>
      <div className="form-control-icon rft">
        <DatePicker
          selected={value ? new Date(value) : null}
          id={id}
          autoComplete={'off'}
          wrapperClassName={`${wrapperClassName} d-block`}
          className={className}
          onChangeRaw={(e) => e.preventDefault()}
          {...args}
        />
      </div>
    </div>
  );
};

export default EnglishDatePicker;
