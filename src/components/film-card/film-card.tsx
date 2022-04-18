import { useRef } from 'react';
import { Film } from './../../types/film.types';

export function FilmCard({
  name,
  previewImage,
  previewVideoLink,
}: Film): JSX.Element {
  const playRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = (video: any) => {
    video.current.play();
  };

  const handleStopVideo = (video: any) => {
    video.current.pause();
    const videoSrc = video.current.src;
    video.current.src = '';
    video.current.src = videoSrc;
  };

  return (
    <li
      className='small-film-card catalog__films-card'
      style={{ overflow: 'hidden' }}
      onMouseLeave={() => handleStopVideo(playRef)}
      onMouseEnter={() => handlePlayVideo(playRef)}
    >
      <div className='small-film-card__image'>
        <video
          ref={playRef}
          src={previewVideoLink}
          width={280}
          height={175}
          poster={previewImage}
          muted
        />
      </div>
      <h3 className='small-film-card__title'>
        <a className='small-film-card__link' href='film-page.html'>
          {name}
        </a>
      </h3>
    </li>
  );
}
