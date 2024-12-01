var factList = [
    "The 1924 Society for Human Rights was the first known gay rights group in the US",
    "Compton's Cafeteria Riot was an uprising against police brutality 3 years before Stonewall lead by trans women and drag queens",
    "The first pride flag was designed by Gilbert Baker and commissioned by Harvey Milk",
    'During the late 1800s wearing a green carnation on your lapel was a subtle que that you were queer'
];

var linkList = [
    "https://lgbtqiahistoryhq.github.io/Website/societyForHumanRights.html",
    "https://lgbtqiahistoryhq.github.io/Website/comptonsCafeteriaRiot.html",
    "https://lgbtqiahistoryhq.github.io/Website/prideFlags.html",
    "https://lgbtqiahistoryhq.github.io/Website/floralSymbolism.html"
];

var fact = document.getElementById("fact");
var link = document.getElementById("link");

var generateBtn = document.getElementById("generateBtn");
var count = 0;

if (generateBtn) {
    generateBtn.addEventListener("click", displayFact);
}

function displayFact() {
    fact.innerHTML = factList[count];
    link.innerHTML = "Learn More";
    link.href = linkList[count];
    count++;
    if (count >= factList.length) {
        count = 0;
    }
}

let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

fetch(
  "https://lgbtqiahistoryhq.com/content.json"
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
    searchDisplay.innerHTML = "No results found. To suggest a topic go to the contact us page."
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