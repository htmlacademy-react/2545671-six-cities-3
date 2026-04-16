import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Offer } from '../../types/offer';
import { AuthorizationStatus, AppRoute } from '../../consts/consts';
import { postFavoriteAction } from '../../store/api-action/api-action';

const configButton = {
  small: {
    imageWidth: 18,
    imageHeight: 19,
  },
  large: {
    imageWidth: 31,
    imageHeight: 33,
  }
};

type BookmarksButtonProps = {
  offer: Offer;
  variantContext: 'place' | 'offer';
  variant: 'small' | 'large';
}

function BookmarksButtonComponent({ offer, variantContext, variant }:
  BookmarksButtonProps): JSX.Element {
  const size = configButton[variant];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.userReducer.authorizationStatus);

  const handleButtonClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    const status = offer.isFavorite ? 0 : 1;
    dispatch(postFavoriteAction({ offerId: offer.id, status }));
  };

  const baseClass = variantContext === 'offer' ?
    'offer__bookmark-button'
    :
    'place-card__bookmark-button';
  const iconClass = variantContext === 'offer' ?
    'offer__bookmark-icon'
    :
    'place-card__bookmark-icon';
  const activeModifier = offer.isFavorite ?
    `${baseClass}--active`
    :
    '';
  const buttonClassName = `${baseClass} ${activeModifier} button`;

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleButtonClick}
    >
      <svg
        className={iconClass}
        width={size.imageWidth}
        height={size.imageHeight}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export const BookmarksButton = memo(BookmarksButtonComponent);
