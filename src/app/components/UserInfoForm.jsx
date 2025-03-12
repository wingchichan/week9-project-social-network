import pg from "pg";
import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utilities/connect";

export default async function UserInfoForm() {
  // gets userID from Clerk with the auth function
  const { userId } = await auth();

  async function handleAddUserInfo(formData) {
    "use server";
    const { username, bio } = Object.fromEntries(formData);

    const db = connect();
    db.query(
      `INSERT INTO users (clerk_id, username, bio) VALUES ($1, $2, $3)`,
      [userId, username, bio]
    );
  }

  return (
    <form action={handleAddUserInfo} className="flex flex-col">
      <label htmlFor="username">Your Username</label>
      <input
        id="username"
        name="username"
        placeholder="Username"
        type="text"
        required
      />
      <label htmlFor="bio">Who are you?</label>
      <input
        id="bio"
        name="bio"
        placeholder="A little bit about yourself"
        type="text"
        required
      />
      <button className="text-end pt-2 border-solid">Save</button>
    </form>
  );
}
