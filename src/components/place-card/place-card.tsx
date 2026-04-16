import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Offer } from '../../types/offer';
import { getRating } from '../../utils/utils';
import { BookmarksButton } from '../bookmarks-button/bookmarks-button';

const configCard = {
  cities: {
    imageHeight: 200,
    imageWidth: 260,
  },
  favorites: {
    imageHeight: 110,
    imageWidth: 150
  },
  'near-places': {
    imageHeight: 200,
    imageWidth: 260,
  }
};

type PlaceCard = {
  variant: 'cities' | 'favorites' | 'near-places';
  data: Offer;
  onPlaceCardHover?: (offerId?: string) => void;
}

function PlaceCardComponent({ data, variant, onPlaceCardHover }: PlaceCard): JSX.Element {
  const newRating = getRating(data.rating);
  const imageSize = configCard[variant];
  const handleMouseEnter = () => onPlaceCardHover?.(data.id);
  const handleMouseLeave = () => onPlaceCardHover?.();

  const infoClassName = `place-card__info ${variant === 'favorites' ? 'favorites-card__info' : ''}`;

  return (
    <article
      className={`${variant}__card place-card `}
      data-id={data.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      {data.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${variant}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${data.id}`}>
          <img
            className="place-card__image"
            src={data.previewImage}
            width={imageSize.imageWidth}
            height={imageSize.imageHeight}
            alt={data.title}
          />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{data.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarksButton
            offer={data}
            variantContext='place'
            variant='small'
          />
        </div >
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: newRating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${data.id}`}>{data.title}</Link>
        </h2>
        <p className="place-card__type">{data.type}</p>
      </div >
    </article >
  );
}

export const PlaceCard = memo(PlaceCardComponent);
