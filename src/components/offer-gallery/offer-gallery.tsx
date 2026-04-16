import { memo } from 'react';

type OfferGalleryProps = {
  images: string[];
}

function OfferGalleryComponent({ images }: OfferGalleryProps): JSX.Element {
  return (
    <>
      {images.map((src) => (
        <div
          className="offer__image-wrapper"
          key={src}
          data-testid="offer-image-wrapper"
        >
          <img
            className="offer__image"
            src={src}
            alt="Photo studio"
            data-testid="offer-image"
          />
        </div>
      ))}
    </>
  );
}

export const OfferGallery = memo(OfferGalleryComponent);
