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
      dataTop = data.slice(0, 10);
      dataTop.forEach((article, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("active");
        }
        // article.thumbnail is not shown in the carousel because of the CORS policy
        carouselItem.innerHTML = `
                        <img src="https://www.dream-box.tv/Assets/Images/WorksDetail/al-mayadeen/09.png" class="d-block w-100" alt="${article.title}">
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

fetch(`https://alpha-ar-media.almayadeen.net/media/image/2024/9/2/f06683c8-58c0-4460-bb3c-c9d20ac29e2c.jpg`)
.then(response => {
  console.log(response.headers.get('Access-Control-Allow-Origin'));
})
.catch(error => console.error('Error:', error));