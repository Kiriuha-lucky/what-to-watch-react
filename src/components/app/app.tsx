import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.types';
import { Film } from '../film/film';
import { Main } from '../main/main';

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
        {/* <Route
          path={AppRoutes.Login}
          element={<Login />}
        />
        <Route
          path={AppRoutes.Property}
          element={<Property />}
        />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
