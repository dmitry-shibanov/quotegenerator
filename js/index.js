if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceWorker.js");
}

let data = null;

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitter = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showSpinner(hide) {
  loader.hidden = hide;
  quoteContainer.hidden = !hide;
}

function removeSpinner() {
  console.log("came to removeSpinner");
  if (!loader.hidden) {
    showSpinner(true);
  }
}

const getQuote = async () => {
  console.log(`length is ${data.length}`);
  /* eslint-disable-next-line prefer-destructuring */
  const length = data.length;
  const index = Math.floor(Math.random() * Math.floor(length));
  const quote = data[index];
  console.log(`quote is ${quote.text} and ${quote.author}`);
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote.text;
  authorText.innerText = quote.author || "Unknown";
};

const getQuotes = async () => {
  showSpinner(false);
  const proxy = "https://pacific-bastion-10577.herokuapp.com/";
  const url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(proxy + url);

    data = await response.json();
    console.log(data);
    await getQuote();
    removeSpinner();
  } catch (error) {
    console.log("error is", error.message);
  }
};

function tweeQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const urlTwitter = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(urlTwitter, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);

twitter.addEventListener("click", tweeQuote);

getQuotes();
