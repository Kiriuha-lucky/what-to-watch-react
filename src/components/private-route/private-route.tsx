import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/auth.types';
import { AppRoutes } from '../../types/routes.types';
// import { Spinner } from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = 'AUTH';

  // if (authorizationStatus === AuthorizationStatus.Unknown) {
  //   return <Spinner />;
  // }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.SignIn} />
  );
}
