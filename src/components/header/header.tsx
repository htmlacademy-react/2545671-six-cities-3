import { memo } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../logo/logo';
import { AuthorizationStatus, AppRoute } from '../../consts/consts';
import { logoutAction } from '../../store/api-action/api-action';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

type HeaderProps = {
  showNav?: boolean;
};

function HeaderComponent({ showNav = true }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.userReducer.authorizationStatus);
  const user = useAppSelector((state) => state.userReducer.user);
  const favoritesCount = useAppSelector((state) => state.favoritesReducer.favorites.length);

  const isLoggedIn: boolean = authorizationStatus === AuthorizationStatus.Auth;

  const authBlock = isLoggedIn ? (
    <>
      <span className="header__user-name user__name">{user?.email ?? ''}</span>
      <span className="header__favorite-count">{favoritesCount}</span>
    </>
  ) : (
    <span className="header__login">Sign in</span>
  );

  const signOutItem = isLoggedIn ? (
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        to="#"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(logoutAction());
        }}
      >
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  ) : null;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          {showNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={isLoggedIn ? AppRoute.Favorites : AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {authBlock}
                  </Link>
                </li>
                {signOutItem}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
