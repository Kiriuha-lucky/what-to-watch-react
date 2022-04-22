export function ratingToText(rating: number) {
  switch (true) {
    case rating < 3:
      return 'Bad';
    case rating > 3 && rating < 5:
      return 'Normal';
    case rating > 5 && rating < 8:
      return 'Good';
    case rating > 8 && rating < 10:
      return 'Very good';
    case rating === 10:
      return 'Awesome';
    default:
      break;
  }
}

export function timeToText(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;

  return `${hours}h ${minutes}m`;
}
