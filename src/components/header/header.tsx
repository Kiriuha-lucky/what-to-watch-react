import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/auth.types';
import { AppRoutes } from '../../types/routes.types';
import { useAppSelector, useAppDispatch } from './../../hooks/index';

interface HeaderProps {
  children?: JSX.Element,
  viewLogin?: boolean
}

export function Header({ children, viewLogin = true }: HeaderProps): JSX.Element {
  const authStatus = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const logout = function (evt: React.SyntheticEvent) {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <header className="page-header user-page__head">
      <div className="logo">
        <a href={AppRoutes.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      {children}
      {authStatus === AuthorizationStatus.Auth ? (viewLogin &&
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to='/mylist' >
                <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <a onClick={logout} className="user-block__link">Sign out</a>
          </li>
        </ul>) : (
        <div className="user-block">
          <Link to='/login' className="user-block__link">Sign in</Link>
        </div>
      )}

    </header>
  );
}
