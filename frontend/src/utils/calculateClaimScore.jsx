import moment from 'moment';
/**
 * Calculates a trust score (60-95) for a claim based on its date
 * More recent claims get higher scores with diminishing returns
 * Takes into account:
 * - Years (exponential decay)
 * - Months (linear decay within the year)
 * - Days (minor impact within the month)
 */
export const calculateClaimTrustScore = (claimDate) => {
  const now = moment();
  const claim = moment(claimDate instanceof Date ? claimDate : new Date(claimDate));
  
  // Calculate different time components
  const yearsDiff = now.diff(claim, 'years');
  const monthsDiff = now.diff(claim, 'months') % 12;
  const daysDiff = now.diff(claim, 'days') % 30;

  // Base score starts at 100
  let score = 100;

  // Year impact: exponential decay
  // Reduces score by 15% per year, compounds
  const yearDecay = Math.pow(0.85, yearsDiff);
  score *= yearDecay;

  // Month impact: linear decay within the current year
  // Can reduce up to 20% based on months
  const monthImpact = (monthsDiff / 12) * 20;
  score -= monthImpact;

  // Day impact: minor linear decay within the current month
  // Can reduce up to 5% based on days
  const dayImpact = (daysDiff / 30) * 5;
  score -= dayImpact;

  // Add a small random variance (-2 to +2)
  const variance = (Math.random() * 4) - 2;
  score += variance;

  // Normalize the score to be between 60 and 95
  const minScore = 60;
  const maxScore = 95;
  const normalizedScore = minScore + ((score - 0) / 100) * (maxScore - minScore);

  // Ensure score stays within the desired range
  return Math.min(Math.max(Math.round(normalizedScore), minScore), maxScore);
};