import { useState, useEffect } from "react";

export default function EditForm() {
  const [formData, setFormData] = useState();

  function handleSubmitChange() {}
  return (
    <form action={handle} className="flex flex-col">
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
