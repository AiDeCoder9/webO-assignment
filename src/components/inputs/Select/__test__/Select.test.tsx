import { OptionType, selectAllOptionsValue, selectMockData, SelectProps } from '../Select.schema';
import Select from '../Select';
import { act, fireEvent, render } from '@testing-library/react';

describe('Select', () => {
  const renderSelect = async <
    OptType extends OptionType,
    ValueOnChange extends boolean = false,
    IsMultiCheckbox extends boolean = false,
    IsMulti extends boolean = false
  >(
    props: SelectProps<OptType, ValueOnChange, IsMultiCheckbox, IsMulti>
  ) => {
    return act(async () => render(<Select {...props} />));
  };

  const openSelectMenu = async <
    OptType extends OptionType,
    ValueOnChange extends boolean = false,
    IsMultiCheckbox extends boolean = false,
    IsMulti extends boolean = false
  >(
    props: SelectProps<OptType, ValueOnChange, IsMultiCheckbox, IsMulti>
  ) => {
    const { container, getByText } = await renderSelect({
      ...props
    });

    fireEvent.keyDown(container.querySelector('input') as HTMLInputElement, {
      key: 'ArrowDown'
    });

    return { container, getByText };
  };

  test('Single Select OnChange', async () => {
    let value: OptionType = selectMockData[1];
    const onChange = jest.fn();
    const { getByText } = await openSelectMenu({
      value,
      options: selectMockData,
      onChange(selected, actionMeta, data) {
        value = selected as OptionType;
        onChange(selected, actionMeta, data);
      }
    });
    fireEvent.click(getByText(selectMockData[0].label));
    expect(onChange).toHaveBeenCalledWith(
      selectMockData[0],
      {
        action: 'select-option',
        isMulti: false,
        isMultiCheckbox: false
      },
      selectMockData[0]
    );

    expect(value).toBe(selectMockData[0]);
  });

  test('Multi Select Onchange', async () => {
    // const value: Array<OptionType> = []
    const onChange = jest.fn();
    const { getByText } = await openSelectMenu({
      isMulti: true,
      value: [],
      options: selectMockData,
      async onChange(selected, actionMeta, data) {
        // await waitFor(() => setValue((prev) => [...prev, ...(selected ?? [])]))
        onChange(selected, actionMeta, data);
      }
    });

    const getMockLabel = (index: number) => selectMockData[index].label;

    const getCalledArgs = (index: number) => {
      return [
        selectMockData.slice(index, index + 1),
        {
          action: 'select-option',
          isMulti: true,
          isMultiCheckbox: false,
          option: selectMockData[index]
        },
        selectMockData.slice(index, index + 1)
      ];
    };

    fireEvent.click(getByText(getMockLabel(0)));
    expect(onChange).toHaveBeenCalledWith(...getCalledArgs(0));

    fireEvent.click(getByText(getMockLabel(1)));
    expect(onChange).toHaveBeenCalledWith(...getCalledArgs(1));

    expect(onChange).toBeCalledTimes(2);
  });

  test('calculate Value On Change', async () => {
    let value: ValPrimitive = '';
    const onChange = jest.fn();
    const { getByText } = await openSelectMenu({
      value,
      options: selectMockData,
      calculateValueOnChange: true,
      onChange(selected, actionMeta, data) {
        value = selected as ValPrimitive;
        onChange(selected, actionMeta, data);
      }
    });
    fireEvent.click(getByText(selectMockData[7].label));

    expect(onChange).toHaveBeenCalledWith(
      selectMockData[7].value,
      expect.anything(),
      selectMockData[7]
    );
  });

  test('Select All in Check box selects all options', async () => {
    let value: Array<OptionType> = [];
    const onChange = jest.fn();
    const { getByText } = await openSelectMenu({
      // isMulti: true,
      isMultiCheckbox: true,
      value,
      options: selectMockData,
      onChange(selected, actionMeta, data) {
        value = [...value, ...(selected ?? [])];
        onChange(selected, actionMeta, data);
      }
    });

    fireEvent.click(getByText(selectAllOptionsValue.label));
    expect(onChange).toHaveBeenCalledWith(selectMockData, expect.anything(), selectMockData);
  });
});
