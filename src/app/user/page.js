// current user's profile page

import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utilities/connect";
import UserInfoForm from "../components/UserInfoForm";

export default async function CurrentUserPage() {
  const { userId, redirectToSignIn } = await auth();
  const db = connect();

  // checking if user id is in our DB
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);

  // if no user id in database redirect to sign in
  if (!userId) return redirectToSignIn();

  // rowCount in the userInfo object holds the id, so if it's 0 it means there is no existing user in our DB, therefore display the UserInfoForm for user to complete and when saved it will create that rowCount id so when they log in next time and DB is queried it will show welcome message below instead
  if (userInfo.rowCount == 0) {
    return (
      <section>
        <UserInfoForm />
      </section>
    );
  }

  return (
    <div>
      <h3>Welcome to your page {userInfo.rows[0].username}!</h3>
      <p>{userInfo.rows[0].bio}</p>
      <p>Your content should be here</p>
    </div>
  );
}
