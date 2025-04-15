var submitBtn = document.getElementById("submitBtn");

var years = [
    "1st-130",
    "2nd-1623",
    "3rd-1624",
    "4th-1649",
    "5th-1749",
    "6th-1779",
    "7th-1886",
    "8th-1924",
    "9th-1925",
    "10th-1928",
    "11th-1950",
    "12th-1952",
    "13th-1955",
    "14th-1956",
    "15th-1962",
    "16th-1963",
    "17th-1963",
    "18th-1966",
    "19th-1969",
    "20th-1970",
    "21st-1970",
    "22nd-1973",
    "23rd-1977",
    "24th-1980",
    "25th-1982",
    "26th-1984",
    "27th-1985",
    "28th-1987",
    "29th-1989",
    "30th-1989",
    "31st-1991",
    "32nd-1994",
    "33rd-1996",
    "34th-1997",
    "35th-1998",
    "36th-1998",
    "37th-1999",
    "38th-2002",
    "39th-2003",
    "40th-2003",
    "41st-2004",
    "42nd-2006",
    "43rd-2006",
    "44th-2009",
    "45th-2009",
    "46th-2011",
    "47th-2011",
    "48th-2011",
    "49th-2012",
    "50th-2013",
    "51st-2014",
    "52nd-2014",
    "53rd-2014",
    "54th-2015",
    "55th-2015",
    "56th-2015",
    "57th-2015",
    "58th-2015",
    "59th-2016"
]

if (submitBtn) {
    submitBtn.addEventListener("click", check);
}

function check() {
    console.log("Running check");

    for(var i=1; i<60; i++) {
        var element = document.getElementById(i);
        var card = document.getElementById("card" + i);
        var year = document.getElementById("year" + i);

        year.innerHTML = years[i - 1];
        year.style.padding = "0.5rem 0rem";
        year.style.color = "#563C5C"

        if (element.value == i) {
            card.style.borderColor = "#425C3C";
        }
        else {
            card.style.borderColor = "#8E2A2A";
        }
    }
}