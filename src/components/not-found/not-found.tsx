import { Link } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';

export function NotFound(): JSX.Element {
  return (
    <>
      <h1>NOT FOUND</h1>
      <Link to={AppRoutes.Main}>To Main</Link>
    </>
  );
}
