import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correct', () => {
    const expectedCity = 'Paris';
    const mainEmptyContainerTestId = 'main-empty__container';
    const mainEmptyValueTestId = 'main-empty__value';
    render(<MainEmpty cityName={expectedCity} />);
    const mainEmptyContainer = screen.getByTestId(mainEmptyContainerTestId);
    const mainEmptyValue = screen.getByTestId(mainEmptyValueTestId);

    expect(mainEmptyContainer).toBeInTheDocument();
    expect(mainEmptyValue).toBeInTheDocument();
  });
});
