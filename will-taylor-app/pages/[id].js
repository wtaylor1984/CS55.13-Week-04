import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
// - this name is defined by next.js
export async function getStaticProps( { params } ) {
  const itemData = await getData(params.id);
  console.log("itemData ");
  console.log(itemData );
  return {
    props: {
      itemData
      
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

// export our dynamically routed page component Entry
export default function Entry( { itemData } ) {
  console.log(itemData );
  //console.log(itemData[1][0].id );
  //console.log(itemData.pets[0].id);
  //console.log(itemData[0].name);
  
  return (
    <Layout>
      <h1>{itemData.post_title}&apos;s Info and Pets</h1>
      <article className="card col-6">
        <div className="card-body">
          <h4 className="card-title">{itemData.post_title}</h4>
          <h5 className="card-subtitle mb-2 text-body-secondary">{itemData.guid}</h5>
          <p className="card-text">{itemData.post_date}</p>
          
        </div>
      </article>
      
      
      
    </Layout>
  );
  
}
