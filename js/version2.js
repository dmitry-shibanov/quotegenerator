// Get quotes from api.
async function getQuotes() {
  const url = "https://type.fit/api/quotes";
  let data = [];
  try {
    const response = await fetch(url);
    data = await response.json();
    const { length } = data;
    Math.floor(Math.random() * Math.floor(length));
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

getQuotes();
