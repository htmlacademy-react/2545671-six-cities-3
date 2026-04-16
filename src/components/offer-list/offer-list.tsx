import { PlaceCard } from '../place-card/place-card';
import { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  onActiveOfferChange?: (id: string | null) => void;
}

function OfferList({ offers, onActiveOfferChange }: OfferListProps): JSX.Element {

  const handlePlaceCardHover = (offerId?: string) => onActiveOfferChange?.(offerId ?? null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => (
        <PlaceCard
          key={card.id}
          data={card}
          variant='cities'
          onPlaceCardHover={handlePlaceCardHover}
        />))}
    </div>
  );
}

export default OfferList;
