export function convertRatingToPercentage(rating: number): number {
  return Math.floor((rating * 100) / 5);
}
