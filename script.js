var factList = [
    "Eleanor Roosevelt was queer",
    "The 1924 Society for Human Rights was the first known gay rights group in the US",
    "Compton's Cafeteria Riot was an uprising against police brutality 3 years before Stonewall lead by trans women and drag queens"
];

var sourceList = [
    "AP*",
    "The Wall Street Journal*",
    "NPR*"
];

var fact = document.getElementById("fact");
var source = document.getElementById("source");

var generateBtn = document.getElementById("generateBtn");
var count = 0;

if (generateBtn) {
    generateBtn.addEventListener("click", displayFact);
}

function displayFact() {
    fact.innerHTML = factList[count];
    source.innerHTML = "Source: " + sourceList[count];
    count++;
    if (count >= factList.length) {
        count = 0;
    }
}

let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

fetch(
  "https://gist.githubusercontent.com/jemimaabu/564beec0a30dbd7d63a90a153d2bc80b/raw/0b7e25ba0ebee6dbba216cfcfbae72d460a60f26/tutorial-levels"
).then(async (response) => {
  postsData = await response.json();
  postsData.map((post) => createPost(post));
});

const createPost = (postData) => {
  const { title, link, categories } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <a class="post-preview" href="${link}" target="_blank">
        <h1>${title}</h1>
      </a>
      <div class="post-content">
        <p class="post-title">${title}</p>
        <div class="post-tags">
          ${categories
            .map((category) => {
              return '<span class="post-tag">' + category + "</span>";
            })
            .join("")}
        </div>
      </div>
  `;

  postsContainer.append(post);
};

const handleSearchPosts = (query) => {
  const searchQuery = query.trim().toLowerCase();
  
  if (searchQuery.length <= 1) {
    resetPosts()
    return
  }
  
  let searchResults = [...postsData].filter(
    (post) =>
      post.categories.some((category) => category.toLowerCase().includes(searchQuery)) ||
      post.title.toLowerCase().includes(searchQuery)
  );
  
  if (searchResults.length == 0) {
    searchDisplay.innerHTML = "No results found"
  } else if (searchResults.length == 1) {
    searchDisplay.innerHTML = `1 result found for your query: ${query}`
  } else {
    searchDisplay.innerHTML = `${searchResults.length} results found for your query: ${query}`
  }

  postsContainer.innerHTML = "";
  searchResults.map((post) => createPost(post));
};

const resetPosts = () => {
  searchDisplay.innerHTML = ""
  postsContainer.innerHTML = "";
  postsData.map((post) => createPost(post));
};

const search = document.getElementById("search");

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);