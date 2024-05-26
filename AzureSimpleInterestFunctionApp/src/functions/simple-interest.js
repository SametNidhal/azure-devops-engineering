const { app } = require('@azure/functions');

app.http('simple-interest', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const principal = parseFloat(request.query.get('principal'));
        const rate = parseFloat(request.query.get('rate'));
        const term = parseFloat(request.query.get('term'));

      if ([principal, rate, term].some(isNaN)) {
        // If any empty or non-numeric values, return a 400 response with an
        // error message
        return {
          status: 400,
          body: "Please supply principal, rate and term in the query string"
        };
      } else {
        // Otherwise set the response body to the product of the three values
        return { body: principal * rate * term };
      }
    }
});