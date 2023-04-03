import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('Search Input Component', () => {
  it('renders input correctly', () => {
    const placeholder = 'Search';
    const { getByPlaceholderText } = render(<SearchInput placeholder={placeholder} />);
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
  it('can be disabled', () => {
    const placeholder = 'Search';
    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} disabled={true} />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeDisabled();
  });
  it('can change background of input', () => {
    const placeholder = 'Search';
    const { getByPlaceholderText } = render(
      <SearchInput placeholder={placeholder} disabled={true} background />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toHaveClass('background');
  });
});
