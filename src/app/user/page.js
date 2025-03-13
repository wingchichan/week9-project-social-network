// current user's profile page

import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utilities/connect";
import UserInfoForm from "../components/UserInfoForm";
import Menubar from "../components/Menubar";
import Image from "next/image";

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

  // querying DB for any posts that are associated with the user id we got from userInfo
  const userPosts = await db.query(
    `SELECT * FROM social_posts WHERE user_id = $1 ORDER BY id DESC`,
    [userInfo.rows[0].id]
  );
  // console.log(userPosts);

  // extracting the records we need from userPosts
  const posts = userPosts.rows;
  // console.log(posts);

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
    <div className="m-5">
      <h1 className="{audiowide.className} uppercase text-3xl font-extrabold mb-5">
        Encipher
      </h1>
      <Menubar />
      <h3 className="mt-5 text-2xl">Welcome {userInfo.rows[0].username}!</h3>
      <p className="mt-3 italic text-cyan-950">{userInfo.rows[0].bio}</p>
      <section>
        <p>Previous posts here</p>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
            <Image
              alt={post.content}
              src={post.img_url}
              width={100}
              height={100}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
