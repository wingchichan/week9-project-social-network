// current user's profile page

import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utilities/connect";
import UserInfoForm from "../components/UserInfoForm";
import Menubar from "../components/Menubar";

export default async function CurrentUserPage() {
  // getting authenticated user's info
  const { userId, redirectToSignIn } = await auth();
  const db = connect();

  // checking if user id is in our DB
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);
  console.log(userInfo);

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
    <div className="m-5">
      <h1 className="{audiowide.className} uppercase text-3xl font-extrabold ">
        Encipher
      </h1>
      <Menubar />
      <h3 className="mt-5 text-2xl">Welcome {userInfo.rows[0].username}!</h3>
      <p className="mt-3 italic text-cyan-950">{userInfo.rows[0].bio}</p>
      <section>
        <p>Previous posts here</p>
      </section>
    </div>
  );
}
