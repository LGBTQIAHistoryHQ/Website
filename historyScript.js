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
  const { title, link, description, categories } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
      <a class="post-preview" href="${link}" target="_blank">
        <h1>${title}</h1>
      </a>
      <div class="post-content">
        <p class="post-description">${description}</p>
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

let popup = document.getElementById("popup");
let nonPopup = document.getElementById("nonPopup");

window.onload = showPopup();

function showPopup() {
  popup.classList.add("openPopup");
  nonPopup.classList.add("openPopupBody");
}

function closePopup() {
  popup.classList.remove("openPopup");
  nonPopup.classList.remove("openPopupBody");
}