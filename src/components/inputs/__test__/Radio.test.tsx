import { fireEvent, render } from '@testing-library/react';
import Radio from '../Radio';

describe('Radio Component', () => {
  it('renders the radio component with the correct structure', () => {
    const { getByLabelText } = render(<Radio label="Option 1" value="1" id="Option1" />);
    const radio = getByLabelText('Option 1');
    expect(radio.getAttribute('value')).toBe('1');
    expect(radio.getAttribute('type')).toBe('radio');
  });

  it('sets the default value of the radio component correctly', () => {
    const { getByLabelText } = render(
      <Radio label="Option 1" value="1" id="Option1" defaultChecked />
    );
    const radio = getByLabelText('Option 1');
    expect(radio).toBeChecked();
  });

  it('changes the value of the radio component when clicked', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Radio label="Option 1" value="1" id="Option1" onChange={onChangeMock} />
    );
    const radio = getByLabelText('Option 1');
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('works correctly in a group of radio buttons', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <>
        <Radio label="Option 1" id="Option1" value="1" name="options" onChange={onChangeMock} />
        <Radio label="Option 2" id="Option2" value="2" name="options" onChange={onChangeMock} />
      </>
    );
    const radio1 = getByLabelText('Option 1');
    const radio2 = getByLabelText('Option 2');

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    fireEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it('can be disabled', () => {
    const { getByLabelText } = render(
      <Radio label="Option 1" id="Option1" value="1" disabled={true} />
    );
    const radio = getByLabelText('Option 1');
    expect(radio).toBeDisabled();
  });

  it('has a label and is associated with the input element', () => {
    const { getByLabelText, getByText } = render(<Radio label="Option 1" id="Option1" value="1" />);
    const radio = getByLabelText('Option 1');
    const label = getByText('Option 1');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label.getAttribute('for')).toBe(radio.id);
  });

  it('meets accessibility guidelines', () => {
    const { getByLabelText } = render(
      <Radio label="Option 1" value="1" id="Option1" aria-checked={false} />
    );
    const radio = getByLabelText('Option 1');
    expect(radio).toHaveAttribute('role', 'radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');
  });
});
