import Header from "./_components/Header";
import dbConnect from "./api/utils/dbConnect";

dbConnect();

export default function Home() {
    return (
        <div>
            <Header />
        </div>
    );
}
