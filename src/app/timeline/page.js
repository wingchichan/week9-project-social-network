import { connect } from "@/utilities/connect";
import Image from "next/image";

export default async function TimelinePage() {
  const db = connect();
  const data = await db.query(`SELECT social_posts.*, users.username
FROM social_posts
JOIN users ON social_posts.user_id = users.id`);
  //   returns the useful data we need
  const posts = data.rows;
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div
          className="flex flex-col pt-10 odd:bg-white even:bg-gray-50 p-4 rounded-lg mb-1"
          key={post.id}
        >
          <p className="font-bold underline">{post.username}</p>
          <p className="mb-4">{post.content}</p>
          {/* conditional rendering only if img url has a value */}
          {post.img_url && (
            <Image
              alt={post.content}
              src={post.img_url}
              width={250}
              height={250}
            />
          )}
        </div>
      ))}
    </div>
  );
}
