// i need the node default modules for fs and path
import fs from 'fs';
import path from 'path';

import got from 'got';
import { error } from 'console';

// get filepath to data directory
const dataDir = path.join( process.cwd(), 'data' );

const dataURL = "https://dev-cs55-fall2024-williamtaylor.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  // get filepath to json file
  //const filePath = path.join(dataDir, 'data.json');
  
  // load json file contents
  //const jsonString = fs.readFileSync(filePath,'utf8');

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error)
  {
    jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  // sort json array by name property
  jsonObj.sort(
    function(a,b) {
      return a.post_title.localeCompare(b.post_title);
    }
  );

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(
    function(item) {
      return {
        id: item.ID.toString(),
        name: item.post_title
      };
    }
  );
}

// function returns ids for all json objects in array
export async function getAllIds() {
  // get filepath to json file
  //const filePath = path.join(dataDir, 'data.json');
  
  // load json file contents
  //const jsonString = fs.readFileSync(filePath,'utf8');


  let jsonString;

  try {

    jsonString = await got(dataURL);
    console.log(jsonString.body);

  } catch(error)
  {
    jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  return jsonObj.map(
    function(item) {
      return {
        params: {
          id: item.ID.toString()
        }
      };
    }
  );
  
}


// This one is too simple and I want to get all the information in the app in a better way!
export async function getData(idRequested) {
  // get filepath to json file
  //const filePath = path.join(dataDir, 'data.json');
  
  // load json file contents
  //const jsonString = fs.readFileSync(filePath,'utf8');
  let jsonString;

  try {

    jsonString = await got(dataURL);
    console.log(jsonString.body);

  } catch(error)
  {
    jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}
