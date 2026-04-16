import { memo } from 'react';
import { Offer } from '../../types/offer';
import { getRating, capitalizeFirst } from '../../utils/utils';
import { MIN_COUNT } from '../../consts/consts';
import { BookmarksButton } from '../bookmarks-button/bookmarks-button';


type OfferDetails = {
  data: Offer;
};

function OfferDetailsComponent({ data }: OfferDetails) {
  const { title, isPremium, rating, type, bedrooms, maxAdults, price } = data;

  const newRating = getRating(rating);

  return (
    <>
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>)}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <BookmarksButton
          offer={data}
          variantContext='offer'
          variant='large'
        />
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{ width: newRating }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">
          {rating}
        </span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {capitalizeFirst(type)}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} {bedrooms === MIN_COUNT ? 'Bedroom' : 'Bedrooms'}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} {maxAdults === MIN_COUNT ? 'adult' : 'adults'}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

export const OfferDetails = memo(OfferDetailsComponent);
