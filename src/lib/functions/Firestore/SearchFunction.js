import fuzzysort from 'fuzzysort';
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  Query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * A utility class that implements fuzzy search for Firestore collections
 * using a combination of Firestore queries and client-side fuzzy matching
 */
class FirestoreFuzzySearch {
  /**
   * @param {string} collectionName - Name of the collection to search
   * @param {string[]} searchFields - Array of field names to search within
   * @param {object} options - Additional options for fuzzy search
   */
  constructor(collectionName, searchFields, options = {}) {
    this.db = db;
    this.collectionName = collectionName;
    this.searchFields = searchFields;
    this.options = {
      threshold: 0.3, // Fuzzy match threshold (0 to 1)
      limit: 20, // Maximum number of results
      cacheSize: 100, // Number of documents to cache
      ...options,
    };

    // Cache for storing previously fetched documents
    this.cache = new Map();
  }

  /**
   * Creates search tokens from a string
   * @param {string} text - Text to tokenize
   * @returns {string[]} Array of search tokens
   */
  createSearchTokens(text) {
    if (!text) return [];
    return text
      .toLowerCase()
      .split(/[\s-_]+/)
      .filter((token) => token.length >= 2)
      .map((token) => token.substring(0, 10)); // Limit token length
  }

  /**
   * Performs a fuzzy search across the specified collection
   * @param {string} searchText - Text to search for
   * @returns {Promise<Array>} Array of matched documents
   */
  async search(searchText) {
    if (!searchText || searchText.length < 2) {
      return [];
    }

    // Create search tokens
    const searchTokens = this.createSearchTokens(searchText);
    if (searchTokens.length === 0) return [];

    // First, try to get results from cache
    const cachedResults = this.searchCache(searchText);
    if (cachedResults.length > 0) {
      return cachedResults;
    }

    // Construct Firestore query
    const searchQuery = this.constructFirestoreQuery(searchTokens[0]);

    // Fetch documents
    const documents = await this.fetchDocuments(searchQuery);

    // Update cache
    this.updateCache(documents);

    // Perform client-side fuzzy matching
    return this.performFuzzyMatch(documents, searchText);
  }

  /**
   * Constructs a Firestore query based on the first search token
   * @param {string} firstToken - First token from search text
   * @returns {Query} Firestore query
   */
  constructFirestoreQuery(firstToken) {
    const collectionRef = collection(this.db, this.collectionName);

    // Create compound queries for each search field
    const queries = this.searchFields.map((field) =>
      query(
        collectionRef,
        where(field, '>=', firstToken),
        where(field, '<=', firstToken + '\uf8ff'),
        limit(this.options.limit)
      )
    );

    return queries;
  }

  /**
   * Fetches documents from Firestore based on queries
   * @param {Query[]} queries - Array of Firestore queries
   * @returns {Promise<Array>} Array of documents
   */
  async fetchDocuments(queries) {
    const results = await Promise.all(
      queries.map(async (q) => {
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
    );

    // Merge and deduplicate results
    return Array.from(
      new Map(results.flat().map((doc) => [doc.id, doc])).values()
    );
  }

  /**
   * Performs client-side fuzzy matching on documents
   * @param {Array} documents - Array of documents to search
   * @param {string} searchText - Original search text
   * @returns {Array} Matched and ranked documents
   */
  performFuzzyMatch(documents, searchText) {
    const fuzzyResults = documents.map((doc) => {
      // Prepare searchable text from all search fields
      const searchableText = this.searchFields
        .map((field) => doc[field])
        .filter(Boolean)
        .join(' ');

      // Perform fuzzy match
      const result = fuzzysort.single(searchText, searchableText);

      if (!result || result.score < -this.options.threshold) {
        return null;
      }

      return {
        ...doc,
        score: result.score,
      };
    });

    // Filter out non-matches and sort by score
    return fuzzyResults
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, this.options.limit);
  }

  /**
   * Searches the cache for matching documents
   * @param {string} searchText - Text to search for
   * @returns {Array} Matched documents from cache
   */
  searchCache(searchText) {
    if (this.cache.size === 0) return [];

    const cachedDocs = Array.from(this.cache.values());
    return this.performFuzzyMatch(cachedDocs, searchText);
  }

  /**
   * Updates the document cache
   * @param {Array} documents - Documents to cache
   */
  updateCache(documents) {
    documents.forEach((doc) => {
      this.cache.set(doc.id, doc);

      // Maintain cache size limit
      if (this.cache.size > this.options.cacheSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
    });
  }

  /**
   * Clears the document cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Example usage

/**
 * The function `createFuzzySearcher` creates a fuzzy searcher object for Firestore database with
 * specified collection name, search fields, and options.
 * @param db - The `db` parameter is typically a reference to the Firestore database instance that you
 * want to perform the fuzzy search on.
 * @param collectionName - The `collectionName` parameter refers to the name of the collection in the
 * Firestore database that you want to perform fuzzy search on.
 * @param searchFields - The `searchFields` parameter in the `createFuzzySearcher` function refers to
 * an array that contains the fields in the Firestore collection that you want to search for fuzzy
 * matches. These fields will be used to perform the fuzzy search operation when querying the Firestore
 * database.
 * @param options - The `options` parameter in the `createFuzzySearcher` function is used to specify
 * additional configuration settings for the fuzzy searcher. These settings can include things like
 * search algorithm preferences, search result sorting options, search result limit, etc. It allows you
 * to customize the behavior of the fuzzy search functionality
 * @returns A function named `createFuzzySearcher` is being returned. This function takes four
 * parameters: `db`, `collectionName`, `searchFields`, and `options`. Inside the function, a new
 * instance of `FirestoreFuzzySearch` is created with the provided parameters, and this instance is
 * returned.
 */

export const createFuzzySearcher = (collectionName, searchFields, options) => {
  return new FirestoreFuzzySearch(collectionName, searchFields, options);
};
