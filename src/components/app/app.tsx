import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { Film } from '../film/film';
import { Login } from '../login/login';
import { Main } from '../main/main';
import { MyList } from '../my-list/my-list';
import { NotFound } from '../not-found/not-found';
import { Player } from '../player/player';
import { PrivateRoute } from '../private-route/private-route';
import { Review } from '../review/review';

export function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path={AppRoutes.Film}
          element={<Film />}
        />
        <Route
          path={AppRoutes.SignIn}
          element={<Login />}
        />
        <Route
          path={AppRoutes.Player}
          element={<Player />}
        />
        <Route
          path={AppRoutes.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoutes.AddReview}
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
