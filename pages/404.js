import Link from "next/link";
import Meta from "../components/Meta";

export default function FourOhFour({ text = "Az oldal nem található" }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ height: "80vh" }}
    >
      <Meta
        title="Memnote - Az oldal nem található"
        description="A keresett oldal nem található."
      />

      <h1 className="font-bold text-5xl mb-3">Memnote</h1>
      <h2>
        <span className="font-bold">404</span> - {text}
      </h2>
      <Link href="/">
        <span className="bg-gray-200 px-4 py-2 rounded-lg mt-4 cursor-pointer hover:bg-gray-300">
          Vissza a főoldalra
        </span>
      </Link>
    </div>
  );
}
