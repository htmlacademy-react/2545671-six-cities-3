import { FormEvent, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setError, setCity } from '../../store/offers-slice/offers-slice';
import { loginAction } from '../../store/api-action/api-action';
import { AuthorizationStatus, AppRoute, cities } from '../../consts/consts';
import { getRandomInteger } from '../../utils/utils';


function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(
    (state) => state.userReducer.authorizationStatus
  );

  const [quickCity] = useState(() => cities[getRandomInteger(0, cities.length - 1)]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = loginRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    if (!email || !password) {
      return;
    }

    const hasLetter = /[A-Za-zА-Яа-яЁё]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasLetter || !hasDigit) {
      dispatch(setError('Password must contain at least one letter and one digit'));
      return;
    }

    dispatch(loginAction({
      login: email,
      password,
    }));
  };

  const handleQuickCityClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!quickCity) {
      return;
    }
    dispatch(setCity(quickCity));
    navigate(AppRoute.Main);
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login" data-testid="page-login">
      <Helmet><title>6 cities: authorization</title></Helmet>
      <Header showNav={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password" name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="#"
                onClick={handleQuickCityClick}
                data-testid="quick-city-link"
              >
                <span>{quickCity?.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
