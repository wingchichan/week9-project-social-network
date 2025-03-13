export default function newPostPage() {
  return (
    <div className="m-5">
      <h1 className="{audiowide.className} uppercase text-3xl font-extrabold ">
        Encipher
      </h1>
      <div className="pt-10 flex flex-col gap-5">
        <p>Create new post</p>
        <form>
          <label htmlFor="New Post"></label>
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            type="text"
            required
            className="w-full"
          ></textarea>
        </form>
      </div>
    </div>
  );
}
