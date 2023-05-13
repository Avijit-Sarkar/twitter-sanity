import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { Tweet } from "@/typing";
import { fetchTweets } from "@/utils/fetchTweets";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

export default function Home({ tweets }: Props) {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twillo</title>
        <meta name="description" content="A simple and powerfull social app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets} />

        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: { tweets },
  };
};
