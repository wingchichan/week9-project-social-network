"use client";
import deletebutton from "/public/deletebutton.jpg";
export default function DeleteButton({ deleteFunction, id }) {
  return (
    <button
      className="text-4xl bg-neutral-300 text-neutral-500 w-12 h-12 text-center relative flex justify-center items-start"
      onClick={() => {
        deleteFunction(id);
      }}
    >
      ⨯
    </button>
  );
}
