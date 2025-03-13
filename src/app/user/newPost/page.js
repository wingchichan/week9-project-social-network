import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function newPostPage() {
  async function handleAddPost(formData) {
    "use server";
    const { content, img_url } = Object.fromEntries(formData);
    // getting Clerk userId using auth() function
    const { userId } = await auth();
    const db = connect();
    // querying DB to get specific user according to the Clerk id
    // userInfo will then have an object of data
    const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
      userId,
    ]);

    // the POSTGRES user id is stored in the rows array in userInfo so using that to insert into the social posts table as that is the foreign key that links the two tables
    await db.query(
      `INSERT INTO social_posts (user_id, content, img_url) VALUES ($1, $2, $3)`,
      [userInfo.rows[0].id, content, img_url]
    );
    redirect("/user");
  }

  return (
    <div className="m-5">
      <h1 className="{audiowide.className} uppercase text-3xl font-extrabold ">
        Encipher
      </h1>
      <div className="pt-10 flex flex-col gap-5">
        <p>Create new post</p>
        <form className="flex flex-col gap-2" action={handleAddPost}>
          <label htmlFor="New Post">New Post</label>
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            type="text"
            required
            className="w-full h-40"
          ></textarea>

          <label className="mt-5" htmlFor="image">
            Image URL (optional)
          </label>
          <input id="image" name="image" placeholder="Image URL" type="text" />
          <button className="text-end pt-2 border-solid">Add</button>
        </form>
      </div>
    </div>
  );
}
