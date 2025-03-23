import Post from "../components/Post";

export default async function Feed() {
  return (
    <div className="flex items-center flex-col py-5">
      <Post />
    </div>
  );
}
