import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import React from 'react';

export function formatScore(score: string, outOf: number): JSX.Element {
  let n = Number.parseFloat(score);
  if (
    Number.isNaN(n)
        || !Number.isInteger(n * 2)
        || (n < 0)
        || (n > outOf)
  ) {
    // fall back to just displaying the value if it isn't a valid score in the range
    return <>{score}</>;
  }

  const stars: JSX.Element[] = [];
  while (n >= 1) {
    stars.push(
      <StarIcon />,
    );
    n -= 1;
  }
  if (n === 0.5) {
    stars.push(
      <StarHalfIcon />,
    );
  }
  while (stars.length < outOf) {
    stars.push(
      <StarOutlineIcon />,
    );
  }
  return (
    <>{stars}</>
  );
}
