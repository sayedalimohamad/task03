document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(
    "#carouselArticles .carousel-inner"
  );
  const carouselIndicators = document.querySelector(
    "#carouselArticles .carousel-indicators"
  );
  fetch("/recent_articles")
    .then((response) => response.json())
    .then((data) => {
      carouselInner.innerHTML = "";
      carouselIndicators.innerHTML = "";
      dataTop = data.slice(0, 20);
      dataTop.forEach((article, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("active");
        }
        imgFile = article.thumbnail.split("/").pop().split("?")[0];
        // article.thumbnail is not shown in the carousel because of the CORS policy
        // so we need to extract the image file name from the URL and save it in imgFile until we find a permission to show the image from al mayadeen server website
        carouselItem.innerHTML = `
                        <img src="/static/img/${imgFile}" class="d-block w-100" alt="${
          article.title
        }">
                        <div class="carousel-caption d-none d-md-block">
                        <h5>${article.title}</h5>
                        <p>${article.description}</p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-outline-light me-3" onclick="window.open('${
                              article.url
                            }', '_blank')">View</button>
                            <div class="text-white">
                            <h6 class="mb-1">${article.author}</h6>
                            <h6 class="mb-0">${formatDate(
                              article.last_updated
                            )}</h6>
                            </div>
                        </div>
                        </div>
          `;
        carouselInner.appendChild(carouselItem);
        const carouselIndicator = document.createElement("button");
        carouselIndicator.type = "button";
        carouselIndicator.dataset.bsTarget = "#carouselArticles";
        carouselIndicator.dataset.bsSlideTo = index;
        carouselIndicator.ariaLabel = `Slide ${index + 1}`;
        if (index === 0) {
          carouselIndicator.classList.add("active");
          carouselIndicator.ariaCurrent = "true";
        }
        carouselIndicators.appendChild(carouselIndicator);
      });
    })
    .catch((error) => console.error("Error fetching articles:", error));
});
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
