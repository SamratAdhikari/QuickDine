import dbConnect from "./api/utils/dbConnect";

dbConnect();

export default function Home() {
  return (
    <>
      <p>Hello World</p>
    </>
  );
}
