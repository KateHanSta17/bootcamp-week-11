  const express = require('express');
  // Helper function to sort our data in ascending and descending order
  const { sortData } = require('./sortData');
  const termData = require('./terms.json');

  const PORT = 3001;

  const app = express();

  const sortHelper = (type) =>
    termData.sort(sortData('term', 'relevance', `${type}`));

  // TODO: Add a comment describing the functionality of this route
// This route will return all terms in the terms.json file in ascending or descending order based on the query parameter sort value.
// If the query parameter sort is set to dsc, the terms will be returned in descending order.

  app.get('/api/terms/', (req, res) => {
    // TODO: Add a comment describing the req.query object
    // The req.query object contains all of the query parameters that are passed in the URL.
    // If there are no query parameters, the object will be empty.
    // If there are query parameters, the object will contain key-value pairs for each parameter.
    // For example, if the URL is /api/terms/?sort=dsc, req.query will be { sort: 'dsc' }
    // If the URL is /api/terms/?sort=asc, req.query will be { sort: 'asc' }
    // If the URL is /api/terms/, req.query will be {}
    // If the URL is /api/terms/?sort=asc&category=science, req.query will be { sort: 'asc', category: 'science' }


    const hasQuery = Object.keys(req.query).length > 0;

    if (hasQuery && req.query.sort === 'dsc') {
      return res.json(sortHelper('dsc'));
    }

    if (hasQuery && req.query.sort === 'asc') {
      return res.json(sortHelper('asc'));
    }

    // If there is no query parameter, return terms
    return res.json(termData);
  });

  // TODO: Add a comment describing what this route will return
  // This route will return the term object from the terms.json file that matches the term query parameter.
  // If the term query parameter is not found in the terms.json file, the route will return a message indicating that the term was not found.
  // The term query parameter is case-insensitive.

  app.get('/api/term/:term', (req, res) => {
    // TODO: Add a comment describing the content of req.params in this instance
    // The req.params object contains the value of the term parameter in the URL.
    // For example, if the URL is /api/term/HTML, req.params will be { term: 'HTML' }

    const requestedTerm = req.params.term.toLowerCase();

    for (let i = 0; i < termData.length; i++) {
      if (requestedTerm === termData[i].term.toLowerCase()) {
        return res.json(termData[i]);
      }
    }

    // Return a message if the term doesn't exist in our DB
    return res.json('No term found');
  });

  // TODO: Add a comment describing what this route will return
  // This route will return all terms in the terms.json file that match the category query parameter.


  app.get('/api/terms/:category', (req, res) => {
    const requestedCategory = req.params.category.toLowerCase();
    const result = [];

    for (let i = 0; i < termData.length; i++) {
      const currentTermCategory = termData[i].category;
      if (requestedCategory === currentTermCategory) {
        result.push(termData[i]);
      }
    }
    return res.json(result);
  });

  // TODO: Add a comment describing what this route will return
  // This route will return all unique categories from the terms.json file.
  // The route will return an array of unique categories.
  // If there are duplicate categories in the terms.json file, the route will return only one instance of each category.
  // The route will return an empty array if there are no categories in the terms.json file.

  app.get('/api/categories', (req, res) => {
    const categories = termData.map((term) => term.category);

    const result = categories.filter((cat, i) => categories.indexOf(cat) === i);

    return res.json(result);
  });

  app.listen(PORT, () =>
    console.info(`Example app listening at http://localhost:${PORT}`)
  );
