// current user's profile page

import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utilities/connect";
import UserInfoForm from "../components/UserInfoForm";
import Image from "next/image";
import DeleteButton from "../components/DeleteButton";
import { revalidatePath } from "next/cache";

export default async function CurrentUserPage() {
  // getting authenticated user's info using Clerk's auth() function
  const { userId, redirectToSignIn } = await auth();

  // connecting to DB
  const db = connect();

  // checking if there is a user id in our DB that's associated with a Clerk id
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);
  // console.log(userInfo);

  if (userInfo.rowCount == 0) return <UserInfoForm />;

  // querying DB for any posts that are associated with the user id we got from userInfo
  const userPosts = await db.query(
    `SELECT * FROM social_posts WHERE user_id = $1 ORDER BY id DESC`,
    [userInfo.rows[0].id]
  );
  // console.log(userPosts);

  // extracting the records we need from userPosts
  const posts = userPosts.rows;
  // console.log(posts);

  async function handleDelete(id) {
    "use server";
    const db = connect();
    console.log("delete");
    await db.query(`DELETE FROM social_posts WHERE id = $1`, [id]);
    revalidatePath("/user");
  }

  // if no user id in our DB, redirect to sign in
  if (!userId) return redirectToSignIn();

  // rowCount in the userInfo object lets us know if there is a 'row/record' in our DB. If 0 it means there is no existing user in our DB, therefore display the UserInfoForm for user to complete. When saved it will create that rowCount 'row/record' (rowCount: 1) so when they log in next time and DB is queried it will show welcome message below instead
  if (userInfo.rowCount == 0) {
    return (
      <section>
        <UserInfoForm />
      </section>
    );
  }

  return (
    <div className="m-5 md:mx-0">
      <div className="bg-neutral-100 p-4 rounded-lg mb-4">
        <h3 className="text-2xl">Welcome {userInfo.rows[0].username}!</h3>
        <p className="mt-3 italic text-cyan-950">{userInfo.rows[0].bio}</p>
      </div>
      <section className="rounded-lg overflow-clip">
        {posts.map((post) => (
          <div key={post.id} className="odd:bg-white even:bg-gray-50 p-4">
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
            <div className="flex flex-row justify-end">
              <DeleteButton deleteFunction={handleDelete} id={post.id} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
