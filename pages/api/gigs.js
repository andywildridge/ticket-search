/*
  Abstract search query to server api to protect api key 
*/

const gigs = async (req, res) => {
  const { url } = req.query;
  const results = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "dHmvC0ZXzF4h1mWldfur13c6s4Ix6wCF4OTzozXC",
      "Content-Type": "application/json",
    },
  });
  const resultsJSON = await results.json();
  res.status(200).json(resultsJSON);
};

export default gigs;
