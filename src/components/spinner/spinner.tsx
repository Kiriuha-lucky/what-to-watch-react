import './spinner.css';

export function Spinner(): JSX.Element {
  return (
    <div className="logo spinner__logo">
      <div className="logo__link logo__link--light">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </div>
    </div>
  );
}

