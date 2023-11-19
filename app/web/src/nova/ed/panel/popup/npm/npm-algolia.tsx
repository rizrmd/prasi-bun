import algoliasearch from "algoliasearch";
const algolia = algoliasearch("OFCNCOG2CU", "f54e21fa3a2a0160595bb058179bfb1e");
const npm = algolia.initIndex("npm-search");
export type AlgoliaResult = {
  name: string;
  objectID: string;
  version: string;
  _highlightResult: { name: { value: string } };
};

export const searchPackage = async (search: string) => {
  const res = await npm.search(search);
  return res.hits as AlgoliaResult[];
};
