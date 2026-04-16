import { render, screen } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';

describe('Component: OfferGallery', () => {
  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.png',
    'https://example.com/image3.webp',
  ];

  it('renders correct number of image wrappers', () => {
    render(<OfferGallery images={images} />);

    const wrappers = screen.getAllByTestId('offer-image-wrapper');
    expect(wrappers).toHaveLength(images.length);
    wrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('offer__image-wrapper');
    });
  });

  it('renders images with correct src and alt', () => {
    render(<OfferGallery images={images} />);

    const imgs = screen.getAllByTestId('offer-image');
    expect(imgs).toHaveLength(images.length);

    imgs.forEach((img, idx) => {
      expect(img).toHaveClass('offer__image');
      expect(img).toHaveAttribute('src', images[idx]);
      expect(img).toHaveAttribute('alt', 'Photo studio');
    });
  });

  it('renders nothing when images array is empty', () => {
    const { container } = render(<OfferGallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
