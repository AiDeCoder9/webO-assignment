import React, { useMemo } from 'react';
import RSelect, { ActionMeta, OptionsType, Styles, ValueType } from 'react-select';
import { Primitive } from 'type-fest';
import {
  deSelectAllOptionsValue,
  OptionType,
  selectAllOptionsValue,
  SelectProps
} from './Select.schema';
import {
  CheckboxOption,
  ClearIndicator,
  DropdownIndicator,
  ValueContainer
} from './select-components';

function Select<
  OptType extends OptionType,
  ValueOnChange extends boolean = false,
  IsMultiCheckbox extends boolean = false,
  IsMulti extends boolean = false
>(props: SelectProps<OptType, ValueOnChange, IsMultiCheckbox, IsMulti>) {
  const {
    value,
    calculateValueOnChange,
    isMulti,
    options,
    isClearable = true,
    isMultiCheckbox,
    loadingMessage = 'Fetching Data...',
    closeMenuOnSelect,
    placeholder = 'Choose Option....',
    onBlur,
    onChange,
    hideSelectedOptions,
    size = 'Regular',
    label,
    ...restProps
  } = props;

  const computedValue = useMemo(() => {
    if (!calculateValueOnChange) return value;
    if (isMulti || isMultiCheckbox) {
      return (options as []).filter((option: OptionType<Primitive>) =>
        (value as unknown as Primitive[])?.includes(option.value)
      );
    }

    return (options as []).find((option: OptionType<Primitive>) => value === option.value);
  }, [calculateValueOnChange, value, isMulti, isMultiCheckbox, options]);

  const computedOptions = useMemo(() => {
    if (!(isMultiCheckbox || isMulti) || !options.length) return options;

    let selectAll = { ...selectAllOptionsValue };
    if (options?.length === (computedValue as [])?.length)
      selectAll = { ...deSelectAllOptionsValue };
    else selectAll.label = selectAllOptionsValue.label;

    return [selectAll, ...options] as OptionsType<OptType>;
  }, [isMultiCheckbox, isMulti, options, computedValue]);

  const onChangeHandler = (
    selected: ValueType<OptType, boolean>,
    actionMeta: ActionMeta<OptType>
  ) => {
    const calculateValue = () => {
      // single value case
      if (!(isMultiCheckbox || isMulti)) {
        if (!calculateValueOnChange) return selected;
        return (selected as OptionType)?.value;
      }
      // select all options
      if (
        actionMeta.action === 'select-option' &&
        actionMeta.option?.value === selectAllOptionsValue.value
      ) {
        // deselect all options
        if (options?.length === (value as unknown as Array<OptionsType<OptType>>)?.length)
          return [];
        if (!calculateValueOnChange) return options;
        return options?.map((v) => v.value);
      }

      // multi case
      if (!calculateValueOnChange) return selected;
      return selected?.map((v: OptionType) => v.value);
    };
    onChange(
      calculateValue(),
      {
        ...actionMeta,
        isMulti: !!isMulti as IsMulti,
        isMultiCheckbox: !!isMultiCheckbox as IsMultiCheckbox
      },
      (actionMeta.option?.value !== selectAllOptionsValue.value ? selected : options) as ValueType<
        OptType,
        IsMulti
      >
    );
  };
  /**
   * custom select styles
   */
  const selectStyles: Partial<Styles<OptType, IsMultiCheckbox | IsMulti>> = {
    control: (_provided, state) => {
      let background = '';
      if (state.selectProps.searchModule) {
        background = '#052354';
      } else if (state.isDisabled && !state.selectProps.searchModule) {
        background = '#e2e2e2';
      } else {
        background = '#f1f1f1';
      }
      return {
        background,
        color: '#1a1a1a',
        display: 'flex',
        width: '100%',
        height: size === 'Regular' ? 'auto' : `calc(${_provided.height}-1em)`,
        padding: '0.30rem 0.75rem',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.4,
        zIndex: 1200,
        verticalAlign: 'middle',
        border:
          state.isFocused ||
          (!state.isDisabled && state.selectProps && state.selectProps.touched && !state.hasValue)
            ? '1px solid #97b7e7'
            : '1px solid #d2dae5',
        appearance: 'none',
        minHeight: 'auto',
        borderRadius: '.25rem',
        ...state.selectProps.customStyles
      };
    },
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 'auto',
      padding: '4px',
      svg: {
        height: '16px',
        width: '16px'
      }
    }),
    indicatorsContainer: (provided) => ({
      ...provided
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    clearIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 'auto',
      padding: '2px',
      svg: {
        fill: '#f44336 !important',
        height: '16px',
        width: '16px'
      }
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: '#000000',
      padding: '.5rem .25rem',
      marginRight: 0
    }),
    loadingMessage: (provided) => ({
      ...provided,
      paddingTop: '.25rem',
      paddingBottom: '.25rem',
      fontSize: '0.875em'
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: '.5rem',
      marginBottom: 0,
      borderRadius: 0,
      zIndex: 9999,
      backgroundColor: state.selectProps.searchModule ? '#052354' : provided.backgroundColor
    }),
    menuList: (provided, state) => ({
      ...provided,
      paddingTop: 0,
      zIndex: 9999,
      paddingBottom: 0,
      backgroundColor: state.selectProps.searchModule ? '#052354' : provided.backgroundColor
    }),
    option: (provided, { isSelected, selectProps }) => {
      return {
        ...provided,
        backgroundColor: isSelected ? '#E3F2FD' : provided.backgroundColor,
        color: isSelected ? '#343A40' : '#495057',
        fontWeight: '400',
        cursor: 'pointer',
        paddingTop: '.25rem',
        paddingBottom: '.25rem',
        fontSize: '0.875rem',
        '&:hover': { backgroundColor: selectProps.searchModule && '#0da3b8' }
      };
    },
    placeholder: (provided) => ({
      ...provided,
      color: '#5e6c84',
      fontSize: '.875rem'
    }),
    input: () => {
      return {};
    },
    singleValue: (provided, { getValue, selectProps }) => {
      let color = '';
      if (selectProps.searchModule) {
        color = '#ACD4FF';
      } else if (!selectProps.searchModule && getValue().length && getValue()[0].color) {
        color = getValue()[0].color;
      } else {
        color = '#1a1a1a';
      }
      return {
        ...provided,
        lineHeight: 1.4,
        color,
        fontWeight: getValue().length && getValue()[0].color ? 800 : provided.fontWeight
      };
    },
    multiValue: (provided) => ({
      ...provided,
      color: '#E9ECEF'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#495057',
      display: size === 'Regular' ? provided.display : 'none',
      ':hover': {
        backgroundColor: '#CED4DA',
        color: '#495057'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: 'auto',
      overflowX: 'auto',
      padding: '0'
    }),
    container: (provided) => {
      return {
        ...provided,
        padding: 0,
        flexGrow: '1'
      };
    }
  };
  return (
    <div className="form-group">
      <label>{label}</label>
      <RSelect
        {...restProps}
        value={computedValue as ValueType<OptType, IsMulti>}
        closeMenuOnSelect={closeMenuOnSelect ?? !(isMulti ?? isMultiCheckbox)}
        options={computedOptions}
        hideSelectedOptions={hideSelectedOptions ?? !isMultiCheckbox}
        isMulti={isMulti || isMultiCheckbox}
        isClearable={isClearable}
        loadingMessage={() => loadingMessage}
        placeholder={placeholder}
        onBlur={(event) => onBlur && onBlur(event, restProps.name)}
        components={{
          DropdownIndicator,
          ClearIndicator,
          ...(isMultiCheckbox && { ValueContainer, Option: CheckboxOption })
        }}
        onChange={onChangeHandler}
        styles={selectStyles}
      />
    </div>
  );
}

export default Select;
