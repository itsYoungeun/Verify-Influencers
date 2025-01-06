import { calculateClaimTrustScore } from "./calculateClaimScore";
import moment from "moment";

export const sortClaims = (claims, sortBy) => {
    return [...claims].sort((a, b) => {
        switch (sortBy) {
        case 'Date':
            return moment(b.date).valueOf() - moment(a.date).valueOf();
        case 'Trust Score':
            return calculateClaimTrustScore(b.date) - calculateClaimTrustScore(a.date);
        default:
            return 0;
        }
    });
};

export const filterClaimsByStatus = (claims, selectedStatus, secondToggle) => {
    if (selectedStatus === 'All Statuses') return claims;

    return claims.filter(claim => {
        if (!secondToggle) return true;

        const trustScore = calculateClaimTrustScore(claim.date);
        
        switch (selectedStatus) {
        case 'Verified':
            return trustScore >= 90;
        case 'Questionable':
            return trustScore >= 70 && trustScore < 90;
        case 'Debunked':
            return trustScore < 70;
        default:
            return true;
        }
    });
};