import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
// - this name is defined by next.js
export async function getStaticProps( { params } ) {
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false
  };
}

// export our dynamically routed page component Entry
export default function Entry( { itemData } ) {
  console.log(itemData);
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData[0].petName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{itemData[0].type}</h6>
          <p className="card-text">{itemData[0].breed}</p>
          <p href="#" className="card-link">{itemData[0].age} year(s) old</p>
        </div>
      </article>
    </Layout>
  );
}