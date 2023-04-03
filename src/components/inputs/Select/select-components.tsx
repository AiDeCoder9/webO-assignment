import { OptionType, selectAllOptionsValue } from './Select.schema';
import { components, IndicatorProps, OptionProps, ValueContainerProps } from 'react-select';

import { BiCaretDown } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import Checkbox from '../Checkbox';

export const DropdownIndicator = <OptType extends OptionType, IsMulti extends boolean>(
  props: IndicatorProps<OptType, IsMulti>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <BiCaretDown />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = <OptType extends OptionType, IsMulti extends boolean>(
  props: IndicatorProps<OptType, IsMulti>
) => {
  return (
    <components.ClearIndicator {...props}>
      <AiOutlineClose />
    </components.ClearIndicator>
  );
};

export const CheckboxOption = <OptType extends OptionType, IsMulti extends boolean>(
  props: OptionProps<OptType, IsMulti>
) => {
  const { isSelected, label, getValue, options } = props;
  const currentValues = getValue()?.length;

  let selectAllSelected = false;
  if (currentValues === options.length - 1) selectAllSelected = true;

  return (
    <components.Option {...props}>
      <Checkbox label={label} checked={isSelected || selectAllSelected} onChange={() => null} />
    </components.Option>
  );
};

export const ValueContainer = <OptType extends OptionType, IsMulti extends boolean>(
  props: ValueContainerProps<OptType, IsMulti>
) => {
  const { children, ...args } = props;

  const currentValues = args.getValue();
  let selectedCount = currentValues.length;

  if (currentValues.some((val) => val.value === selectAllOptionsValue.value))
    selectedCount = currentValues.length - 1;

  return (
    <components.ValueContainer {...args}>
      <div style={selectedCount ? {} : { color: '#b3b3b3' }} className="mr-2">
        {selectedCount ? <>{selectedCount} selected</> : 'Choose Option...'}
      </div>
      {/* This element contains the event for opening and closing the select input */}
      {Array.isArray(children) ? children[1] : null}
    </components.ValueContainer>
  );
};
