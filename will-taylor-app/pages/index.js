import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout"
import { getSortedList } from "../lib/data"
import Link from "next/link";


// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: { allData }
  };
}

export default function Home( { allData } ) {
  return (
    <>
      <Layout home>
      <h1>Post info from WP</h1>
      <div className="list-group">
        {allData.map(
            ({id, name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
    </>
  );
}
