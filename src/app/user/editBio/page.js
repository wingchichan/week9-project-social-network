import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import UserInfoForm from "@/app/components/UserInfoForm";

export default async function EditBioPage() {
  // conneect to DB
  // get data from the correct fields
  const { userId } = await auth();

  const db = connect();

  // querying for the Clerk id
  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);

  const username = userInfo.rows[0].username;
  const bio = userInfo.rows[0].bio;
  console.log(username, bio);

  // db.query(`SELECT * FROM users WHERE username = $1, bio = $2`, [
  //   userInfo.rows[0].username,
  //   userInfo.rows[0].bio,
  // ]);

  return (
    <div>
      <UserInfoForm />
    </div>
  );
}
