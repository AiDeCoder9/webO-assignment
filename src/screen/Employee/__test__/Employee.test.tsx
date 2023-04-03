import createWrapper from '@/screen/__mocks__/MockScreenProvider';

import { renderHook } from '@testing-library/react-hooks';
import { useEmployeeDetail, useEmployeeList } from '../employeeQueries';

const mockedList = useEmployeeList as jest.Mock<any>;
const mockedDetail = useEmployeeDetail as jest.Mock<any>;
const list: Array<IData> = [
  { index: 'aboleth', name: 'Aboleth', url: '/api/monsters/aboleth' },
  { index: 'acolyte', name: 'Acolyte', url: '/api/monsters/acolyte' }
];
jest.mock('../monstersQueries.ts');

describe('Monsters Query', () => {
  beforeEach(() => {
    mockedList.mockImplementation(() => ({ isLoading: true, data: null, error: false }));
  });
  it('when in initial stage', async () => {
    const { result, waitFor } = renderHook(() => useEmployeeList(), { wrapper: createWrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.data).toBe(null));
    await waitFor(() => expect(result.current.error).toBe(false));
  });
  it('given with data ', async () => {
    mockedList.mockReturnValue({
      data: list,
      isLoading: false,
      error: false
    });
    const { result, waitFor } = renderHook(() => useEmployeeList(), {
      wrapper: createWrapper
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(list);
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toBeFalsy();
    });
  });
  it('given with error ', async () => {
    mockedList.mockReturnValue({
      data: null,
      isLoading: false,
      error: true
    });
    const { result, waitFor } = renderHook(() => useEmployeeList(), {
      wrapper: createWrapper
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(null);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toBeTruthy();
    });
  });
});

describe('Monsters Detail Query', () => {
  beforeEach(() => {
    mockedDetail.mockImplementation(() => ({ isLoading: true, data: null, error: false }));
  });
  it('when in initial stage', async () => {
    const { result, waitFor } = renderHook(() => useEmployeeDetail(list[0].index), {
      wrapper: createWrapper
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    await waitFor(() => expect(result.current.data).toBe(null));
    await waitFor(() => expect(result.current.error).toBe(false));
  });
  it('given with data ', async () => {
    mockedDetail.mockReturnValue({
      data: {
        name: 'Aboleth',
        alignment: 'lawful evil'
      },
      isLoading: false,
      error: false
    });
    const { result, waitFor } = renderHook(() => useEmployeeDetail(list[0].index), {
      wrapper: createWrapper
    });
    await waitFor(() => {
      expect(result.current.data?.alignment).toEqual('lawful evil');
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toBeFalsy();
    });
  });
  it('given with error ', async () => {
    mockedList.mockReturnValue({
      data: null,
      isLoading: false,
      error: true
    });
    const { result, waitFor } = renderHook(() => useEmployeeList(), {
      wrapper: createWrapper
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(null);
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.error).toBeTruthy();
    });
  });
});
