import { fireEvent, render } from '@testing-library/react';
import Overlay from '../Overlay/Overlay';

describe('Overlay', () => {
  const toggle = jest.fn();
  const title = 'Custom Overlay';
  it('should render without errors', () => {
    const { getByText } = render(<Overlay title={title} toggle={toggle} />);
    expect(getByText(title)).toBeInTheDocument();
  });
  it('should accepts children', () => {
    const { getByText } = render(
      <Overlay title={title} toggle={toggle}>
        <h1>Inside overlay</h1>
      </Overlay>
    );
    expect(getByText('Inside overlay')).toBeInTheDocument();
  });
  it('should handle overlay toggle', () => {
    const { getByRole } = render(<Overlay title={title} toggle={toggle} />);
    expect(getByRole('button')).toBeInTheDocument();
    fireEvent.click(getByRole('button'));
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
