import {
  ActionMeta,
  GroupedOptionsType,
  InputActionMeta,
  MenuPlacement,
  OptionsType,
  ValueType as RSValueType
} from 'react-select';
import React from 'react';
import { Option } from 'react-select/src/filters';

// eslint-disable-next-line

export const selectAllOptionsValue = {
  label: 'Select All',
  value: '*'
};

export const deSelectAllOptionsValue = {
  label: 'Deselect All',
  value: '*'
};

type ArrayOnTrue<Data, IsTrue extends boolean> = IsTrue extends true ? ReadonlyArray<Data> : Data;

export type ValueType<
  OptType extends OptionType,
  ValueOnChange extends boolean,
  IsMultiCheckbox extends boolean,
  IsMulti extends boolean
> = ValueOnChange extends true
  ?
      | ArrayOnTrue<
          ValPrimitive,
          IsMulti extends true ? IsMulti : IsMultiCheckbox extends true ? IsMultiCheckbox : false
        >
      | undefined
      | null
  : RSValueType<
      OptType,
      IsMulti extends true ? IsMulti : IsMultiCheckbox extends true ? IsMultiCheckbox : false
    >;

export interface SelectProps<
  OptType extends OptionType,
  ValueOnChange extends boolean,
  IsMultiCheckbox extends boolean,
  IsMulti extends boolean
> {
  value: ValueType<OptType, ValueOnChange, IsMultiCheckbox, IsMulti>;
  options: GroupedOptionsType<OptType> | OptionsType<OptType>;
  label?: string;
  hasError?: boolean;
  onChange(
    value: ValueType<OptType, ValueOnChange, IsMultiCheckbox, IsMulti>,
    actionMeta: ActionMeta<OptType> & {
      isMulti: IsMulti;
      isMultiCheckbox: IsMultiCheckbox;
    },
    data: RSValueType<OptType, IsMulti>
  ): void;

  name?: string;
  isMulti?: IsMulti;
  isClearable?: boolean;
  calculateValueOnChange?: ValueOnChange;
  loadingMessage?: string;
  closeMenuOnSelect?: boolean;
  placeholder?: string;
  id?: string;

  onBlur?(event: React.FocusEvent<HTMLElement>, name?: string): void;

  isSearchable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  filterOption?: ((option: Option, rawInput: string) => boolean) | null;
  autoFocus?: boolean;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  menuPlacement?: MenuPlacement;
  className?: string;
  customDropdownIcon?: React.ReactNode;
  controlShouldRenderValue?: boolean;
  isMultiCheckbox?: IsMultiCheckbox;
  hideSelectedOptions?: boolean;
  size?: SizeVariant;
}

export type SizeVariant = 'Regular' | 'Small';
export const selectMockData = [
  { label: 'Mocked option 1', value: 'mocked-option-1' },
  { label: 'Mocked option 2', value: 'mocked-option-2' },
  { label: 'Mocked option 3', value: 'mocked-option-3' },
  { label: 'Mocked option 4', value: 'mocked-option-4' },
  { label: 'Mocked option 5', value: 'mocked-option-5' },
  { label: 'Mocked option 6', value: 'mocked-option-6' },
  { label: 'Mocked option 7', value: 'mocked-option-7' },
  { label: 'Mocked option 8', value: 'mocked-option-8' },
  { label: 'Mocked option 9', value: 'mocked-option-9' },
  { label: 'Mocked option 10', value: 'mocked-option-10' }
];
