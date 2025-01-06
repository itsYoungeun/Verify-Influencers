export const findBestResearchMatch = (claimCategories, researchArticles) => {
  let bestMatch = null;
  let maxMatchCount = 0;

  researchArticles.forEach(research => {
    const matchCount = research.category.filter(cat => 
      claimCategories.includes(cat)
    ).length;

    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestMatch = research;
    }
  });

  return bestMatch;
};