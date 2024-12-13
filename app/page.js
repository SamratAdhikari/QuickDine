import Header from "./_components/Header";
import Hero from "./_components/Hero";
import dbConnect from "./api/utils/dbConnect";
dbConnect();

export default function Home() {
    return (
        <div>

            <Header />
            <Hero />
        </div>
    );
}
