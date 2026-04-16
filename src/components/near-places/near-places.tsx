import { memo } from 'react';
import { Offer } from '../../types/offer';
import { PlaceCard } from '../place-card/place-card';

type NearPlacesProps = {
  offers: Offer[];
}

function NearPlacesComponent({ offers }: NearPlacesProps): JSX.Element {

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((card) => (
          <PlaceCard
            key={card.id}
            data={card}
            variant='near-places'
          />
        ))}
      </div>
    </section>
  );
}

export const NearPlaces = memo(NearPlacesComponent);
