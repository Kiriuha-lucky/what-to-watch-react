import { AppRoutes } from '../../types/routes.types';

interface HeaderProps {
  children?: JSX.Element,
  viewLogin?: boolean
}

export function Header({ children, viewLogin = true }: HeaderProps): JSX.Element {
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
      {viewLogin &&
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>}
    </header>
  );
}
