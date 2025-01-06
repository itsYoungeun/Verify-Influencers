import moment from 'moment';
import { calculateClaimTrustScore } from './calculateClaimScore';

export const verificationStatuses = ['All Statuses', 'Verified', 'Questionable', 'Debunked'];

export const getVerificationStatus = (claim, secondToggle) => {
  if (!secondToggle) return claim.category;

  // Calculate the trust score based on the claim's date
  const trustScore = calculateClaimTrustScore(claim.date);

  // Logic to determine verification status based on the trust score
  if (trustScore >= 90) {
    return ['Verified'];
  } else if (trustScore >= 70) {
    const daysSinceClaim = moment().diff(moment(claim.date), 'days');
    // Add additional logic if needed for dates close to today
    if (daysSinceClaim < 30) {
      return ['Verified']; // New claims with reasonable score are "Verified"
    }
    return ['Questionable'];
  } else {
    return ['Debunked'];
  }
};