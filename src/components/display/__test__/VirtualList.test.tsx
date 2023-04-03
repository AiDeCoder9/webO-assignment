import { NoData } from '@/components/feedback';
import { render } from '@testing-library/react';
import VirtualList from '../VirtualList/VirtualList';
const list: Array<IData> = [
  { index: 'acid-arrow', name: 'Acid Arrow', url: '/api/spells/acid-arrow' },
  { index: 'acid-splash', name: 'Acid Splash', url: '/api/spells/acid-splash' }
];
describe('Virtual List', () => {
  const renderItem = (item: IData, index: number) => {
    return <div key={index}>{item.name}</div>;
  };
  describe('given loading state', () => {
    it('when loading is true then renders', () => {
      const { getByText } = render(<VirtualList loading data={list} renderItem={renderItem} />);
      expect(getByText('Loading...')).toBeInTheDocument();
    });
    it('when loading is false then renders', () => {
      const { queryByText, getAllByRole } = render(
        <VirtualList loading={false} data={list} renderItem={renderItem} />
      );
      expect(queryByText('Loading...')).not.toBeInTheDocument();
      expect(getAllByRole('listitem').length).toBeGreaterThan(0);
    });
  });
  describe('given list of elements', () => {
    it('then renders the element', () => {
      const { getAllByRole } = render(<VirtualList data={list} renderItem={renderItem} />);
      expect(getAllByRole('listitem').length).toBeGreaterThan(0);
    });
  });

  describe('given list is empty', () => {
    it('then renders the empty component', () => {
      const { queryAllByRole, queryByText } = render(
        <VirtualList data={[]} renderItem={renderItem} />
      );
      expect(queryAllByRole('listitem').length).toEqual(0);
      expect(queryByText('No Data Found')).toBeInTheDocument();
    });
    it('when custom component is supplied then renders the custom empty component', () => {
      const { queryAllByRole, queryByText } = render(
        <VirtualList
          data={[]}
          renderItem={renderItem}
          listEmptyComponent={() => <NoData title="No Favorites" />}
        />
      );
      expect(queryAllByRole('listitem').length).toEqual(0);
      expect(queryByText('No Favorites')).toBeInTheDocument();
    });
  });
});
