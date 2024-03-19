const inputElem = document.getElementsByClassName("searchInput")[0];
const btnElem = document.getElementsByClassName("btn")[0];
const content = document.getElementsByClassName("contentBox")[0];
const prev = document.getElementsByClassName("prev")[0];
const next = document.getElementsByClassName("next")[0];

const cardsPerPage = 6;
var pageNumber = 1;
var numberOfPages = 10;

const showSearchResult = async function () {
  try {
    content.innerHTML = "";
    const response = await axios.get("https://dapi.kakao.com/v2/search/web", {
      params: {
        query: inputElem.value,
        sort: "accuracy",
        page: pageNumber,
        size: cardsPerPage,
      },
      headers: {
        Authorization: "KakaoAK 78506c1bd0985343833cdcf21b8d7517",
      },
    });

    var dataList = response.data.documents;
    console.log("datalist returned: " + dataList);
    if (dataList == []) {
      return;
    }

    dataList.forEach((result) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h2");
      const link = document.createElement("a");
      link.href = result.url;
      link.innerHTML = result.title;
      title.appendChild(link);

      const body = document.createElement("p");
      body.innerHTML = result.contents;

      card.appendChild(title);
      card.appendChild(body);
      content.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
};

function showPrev() {
  if (pageNumber > 1) {
    pageNumber--;
    showSearchResult(pageNumber);
  }
}

function showNext() {
  if (pageNumber < numberOfPages) {
    pageNumber++;
    showSearchResult(pageNumber);
  }
}

btnElem.addEventListener("click", showSearchResult);
inputElem.addEventListener("keypress", function (event) {
  // on INPUT button, not the Click button!!
  if (event.key === "Enter") {
    showSearchResult();
  }
});
prev.addEventListener("click", showPrev);
next.addEventListener("click", showNext);
