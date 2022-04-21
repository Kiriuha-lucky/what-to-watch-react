import { FormEvent, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { Footer } from './../footer/footer';
import { Header } from './../header/header';
import { useAppSelector, useAppDispatch } from './../../hooks/index';
import { AuthorizationStatus } from '../../types/auth.types';
import { AuthData } from '../../types/auth-data.types';
import { loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

export function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (<Navigate to={AppRoutes.Main} />);
  }

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
    return navigate('/');
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const pattern = /^(?=.*\d)[^a-z]*[a-z].*$/i;


    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!pattern.test(passwordRef.current.value)) {
        toast.error('Пароль должен содержать минимум 1 цифру и 1 букву');
        return;
      }
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="user-page">
      <Header viewLogin={false}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={loginRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div >
  );
}
