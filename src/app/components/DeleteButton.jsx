"use client";
import deletebutton from "/public/deletebutton.jpg";
export default function DeleteButton({ deleteFunction, id }) {
  return (
    // <button
    //   className="text-end"
    //   onClick={() => {
    //     deleteFunction(id);
    //   }}
    // >
    //   Delete Post
    // </button>

    <img
      src="deletebutton.jpg"
      onClick={() => {
        deleteFunction(id);
      }}
    />
  );
}
