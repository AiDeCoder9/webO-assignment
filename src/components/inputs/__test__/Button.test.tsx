import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders text correctly', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    expect(getByText(buttonText)).toBeInTheDocument();
  });
  it('can be disabled', () => {
    const { getByText } = render(<Button disabled={true}>Click Me</Button>);
    const button = getByText('Click Me');
    expect(button).toBeDisabled();
  });
  it('accepts and applies additional props', () => {
    const buttonText = 'Click me';
    const customClassName = 'custom-class';
    const customStyle = { backgroundColor: 'red' };
    const customAriaLabel = 'Custom label';

    const { getByText } = render(
      <Button
        className={customClassName}
        style={customStyle}
        aria-label={customAriaLabel}
        data-testid="custom-button">
        {buttonText}
      </Button>
    );
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(customClassName);
    expect(button).toHaveStyle(customStyle);
    expect(button).toHaveAttribute('aria-label', customAriaLabel);
    expect(button).toHaveAttribute('data-testid', 'custom-button');
  });
  it('handles button click and accepts custom arguments', () => {
    const buttonText = 'Click me';
    const handleClick = jest.fn();
    const args = 'argument';

    const { getByText } = render(
      <Button onClick={() => handleClick(args)} data-testid="custom-button">
        {buttonText}
      </Button>
    );
    const button = getByText(buttonText);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith(args);
  });
  it('handles loading false state', () => {
    const buttonText = 'Click me';
    const loading = false;

    const { getByText } = render(
      <Button loading={loading} data-testid="custom-button">
        {buttonText}
      </Button>
    );
    const button = getByText(buttonText);
    expect(button).not.toBeDisabled();
  });
  it('handles loading true state', () => {
    const buttonText = 'Click me';
    const loading = true;

    const { getByRole } = render(
      <Button loading={loading} role="button" data-testid="custom-button">
        {buttonText}
      </Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('disabled');
  });
});
