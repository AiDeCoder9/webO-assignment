import { render } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render without errors', () => {
    const { getByText } = render(<Spinner />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('should render with given size', () => {
    const { container } = render(<Spinner size={'sm'} />);

    expect(container.querySelector('.spinner-border-sm')).toBeInTheDocument();
  });
});
