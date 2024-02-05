export async function load({ params }) {
  const post = await import(`/src/posts/${params.slug}.md`);
  const { title, date, author } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
    author,
  };
}
