import { useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";
import fetchingImage from "./assets/data-fetching.png";
import { get } from "./utils/get";

import { TypeOf, z } from "zod";

const rawDataPost = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

type rawDataPostType = z.infer<typeof rawDataPost>;

const expectedDataFromAPI = z.array(rawDataPost);

type expectedDataFromAPI = z.infer<typeof expectedDataFromAPI>;

function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const fetchedBlogs = await get<expectedDataFromAPI>(
          "https://jsonplaceholder.typicode.com/posts",
          expectedDataFromAPI
        );

        const formattedBlogs = fetchedBlogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          text: blog.body,
        }));

        setBlogs(formattedBlogs);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    fetchBlogs();
  }, []);

  let component: React.ReactNode = (
    <p id="loading-fallback">Fetching Posts....</p>
  );

  if (error) {
    component = <ErrorMessage text={error} />;
  }

  if (blogs && blogs.length > 0) {
    component = <BlogPosts posts={blogs} />;
  }

  return (
    <main>
      <img src={fetchingImage} alt="" />
      {component}
    </main>
  );
}

export default App;
