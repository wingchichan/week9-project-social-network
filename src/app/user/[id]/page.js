// [id] page/ dynamic route for other user's profile page
import { connect } from "@/utilities/connect";
// The notFound function allows you to render the not-found file within a route segment
// Specifying a not-found file allows you to gracefully handle such errors by rendering a Not Found UI within the segment.
import { notFound } from "next/navigation";

export default async function OtherUsersPage({ params }) {
  const { id } = await params;

  const db = connect();
  const userInfo = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  console.log(userInfo);

  if (userInfo.rowCount == 0) {
    notFound();
  }

  return (
    <div>
      <h3>Welcome to other user&aposs pages</h3>
    </div>
  );
}
