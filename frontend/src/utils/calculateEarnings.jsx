export const parseFollowers = (followers) => {
    if (typeof followers === "string") {
        if (followers.includes("M")) return parseFloat(followers) * 1_000_000;
        if (followers.includes("K")) return parseFloat(followers) * 1_000;
    }
    return Number(followers) || 0; // Fallback to 0 if invalid
};

// Calculate earnings based on trust score and followers
export const calculateEarnings = (trustScore, followers) => {
    const parsedFollowers = parseFollowers(followers);
    const earnings = 1.5 * (trustScore / 100) * parsedFollowers;
    return formatEarnings(earnings);
};

const formatEarnings = (earnings) => {
    if (earnings >= 1000000) {
        return (earnings / 1000000).toFixed(1) + 'M';
    } else if (earnings >= 1000) {
        return (earnings / 1000).toFixed(1) + 'K';
    }
    return earnings.toFixed(2);
};