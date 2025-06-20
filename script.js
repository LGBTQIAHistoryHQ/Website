var factList = [
    "The 1924 Society for Human Rights was the first known gay rights group in the US",
    "Compton's Cafeteria Riot was an uprising against police brutality 3 years before Stonewall lead by trans women and drag queens",
    "The first pride flag was designed by Gilbert Baker and commissioned by Harvey Milk",
    'During the late 1800s wearing a green carnation on your lapel was a subtle que that you were queer'
];

var linkList = [
    "https://lgbtqiahistoryhq.com/historyPages/societyForHumanRights.html",
    "https://lgbtqiahistoryhq.com/historyPages/comptonsCafeteriaRiot.html",
    "https://lgbtqiahistoryhq.com/historyPages/prideFlags.html",
    "https://lgbtqiahistoryhq.com/historyPages/floralSymbolism.html"
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