import { render } from '@testing-library/react';
import NoData from '../NoData';

describe('No Data', () => {
  it('should render without errors', () => {
    const { getByText } = render(<NoData />);
    expect(getByText('No Favorites yet')).toBeInTheDocument();
  });
  it('should render with update props', () => {
    const title = 'No Data found';
    const description = 'Custom description message';
    const { getByText } = render(<NoData title={title} description={description} />);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
  });
  describe('given the component type', () => {
    it('should render with default icon', () => {
      const { getByLabelText } = render(<NoData />);
      expect(getByLabelText('favorite')).toBeInTheDocument();
    });
    it('should render with change icon', () => {
      const { getByLabelText } = render(<NoData type="search" />);
      expect(getByLabelText('search')).toBeInTheDocument();
    });
  });
});
