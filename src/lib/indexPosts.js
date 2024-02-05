export const fetchMarkdownPosts = async () => {
  console.log("Fetching posts");
  const allPostFiles = import.meta.glob("/src/posts/*.md");
  console.log("All post files", allPostFiles);
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice(11, -3);

      return {
        meta: metadata,
        path: postPath,
      };
    })
  );

  return allPosts;
};
