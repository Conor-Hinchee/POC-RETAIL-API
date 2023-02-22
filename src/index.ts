'use strict';

import { SearchServiceClient } from '@google-cloud/retail';
import express from "express";
const app = express();
const port = 3000;

const projectId = 'exp-style-at-scale-sandbox';
const location = 'global';

// Placement is used to identify the Serving Config name.
const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/placements/default_search`;

// Raw search query.
const query = 'Hoodie'; // TRY DIFFERENT QUERY PHRASES

// A unique identifier for tracking visitors.
const visitorId = '12345';

// Maximum number of Products to return.
const pageSize = 10;

const IResponseParams = {
  ISearchResult: 0,
  ISearchRequest: 1,
  ISearchResponse: 2,
};

const retailClient = new SearchServiceClient();
// const projectId = await retailClient.getProjectId();

const getHoodieSearch = async () => {
  const request = {
    placement,
    query,
    visitorId,
    pageSize,
  };
   // tslint:disable-next-line:no-console
  console.log('Search request: ', request);

  // Run request
  return retailClient.search(request, {
    autoPaginate: false,
  });

  // tslint:disable-next-line:no-console
  // console.log(searchResponse);
  // return (searchResponse);
}


app.get('/search', async (req, res) => {
  const response = await getHoodieSearch();
  const searchResponse = response[IResponseParams.ISearchResponse];
  return res.json(searchResponse);
});

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening on port ${port}`);
});
