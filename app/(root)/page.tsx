import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY);
  try {
    console.log("posts", posts, null, 2);
  } catch (error) {
    console.error(error);
  }
  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { id: 1, name: "Deepinder Goyal" },
  //     _id: 2,
  //     description: "This is description",
  //     image:
  //       "https://images.unsplash.com/photo-1741546694630-b8b4408e3cba?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartUpTypeCard, index: Number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
