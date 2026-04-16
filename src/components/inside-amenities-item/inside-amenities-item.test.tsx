import { render, screen } from '@testing-library/react';
import InsideAmenitiesItem from './inside-amenities-item';

describe('Component: InsideAmenitiesItem', () => {
  it('renders list and items correctly', () => {
    const expectedServices = ['Wi-Fi', 'Towels', 'Coffee machine', 'Baby seat'];
    render(<InsideAmenitiesItem services={expectedServices} />);

    const insideContainer = screen.getByTestId('inside-container');
    expect(insideContainer).toBeInTheDocument();

    const insideItems = screen.getAllByTestId('inside-value');
    expect(insideItems).toHaveLength(expectedServices.length);

    const texts = insideItems.map((el) => el.textContent?.trim());
    expect(texts).toEqual(expectedServices);
  });
});
