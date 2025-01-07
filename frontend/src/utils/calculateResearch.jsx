export const findBestResearchMatch = (claim, researchArticles) => {
  // Helper function to remove common stopwords from a string
  const removeStopwords = (text) => {
    const stopwords = ['the', 'and', 'is', 'to', 'of', 'in', 'a', 'an', 'for', 'on', 'with', 'as', 'by', 'at', 'this', 'that', 'it', 'or', 'from', 'was', 'be'];
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => !stopwords.includes(word)) // Filter out stopwords
      .map(word => word.trim())
      .filter(word => word.length > 0); // Ensure no empty words
  };

  // Helper function to generate a dynamic set of keywords from a title
  const extractKeywords = (title) => {
    return removeStopwords(title).map(word => word.toLowerCase()); // Extract non-stopwords
  };

  // Ensure claim.title is a string and claim.category is an array
  const { title: claimTitle, category: claimCategories } = claim;

  if (typeof claimTitle !== 'string') {
    console.error("Invalid claimTitle: Expected a string, got", typeof claimTitle, claimTitle);
    return null;
  }

  if (!Array.isArray(claimCategories)) {
    console.error("Invalid claimCategories: Expected an array, got", typeof claimCategories, claimCategories);
    return null;
  }

  let bestMatch = null;
  let highestScore = 0;

  // Step 1: Extract keywords from the claim title
  const claimKeywords = extractKeywords(claimTitle);

  // Step 2: Calculate match scores based on extracted keywords and categories
  researchArticles.forEach(research => {
    if (typeof research.title !== 'string') {
      console.error("Invalid research title: Expected a string, got", typeof research.title, research);
      return;
    }

    // Extract keywords from the research title
    const researchKeywords = extractKeywords(research.title);

    // Step 3: Match keywords between claim and research
    const keywordMatchCount = claimKeywords.filter(word => researchKeywords.includes(word)).length;

    // Step 4: Calculate match score, giving higher importance to keyword matching
    const keywordMatchScore = keywordMatchCount * 3; // Increase the score for keyword matches

    // Step 5: Check category match
    const categoryMatchScore = research.category.some(cat => claimCategories.includes(cat)) ? 1 : 0;

    const totalScore = keywordMatchScore + categoryMatchScore; // Combine keyword and category match scores

    // If current score is higher than the best, update the best match
    if (totalScore > highestScore) {
      highestScore = totalScore;
      bestMatch = research;
    }
  });

  return bestMatch;
};