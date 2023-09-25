import Head from "next/head";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ datas }) {
  return (
    <div>
      <Head>
        <title>Movie Site</title>
        <meta name="description" content="Created by human" />
      </Head>

      <Header />
      <NavBar />
      <Results results={datas} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      datas: request.results,
    },
  };
}
