let arr = [];
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryData = data.data;
  // console.log(categoryData);
  const categoryButtonContainer = document.getElementById(
    "dynamic-button-container"
  );
  categoryData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id = "dynamic-btn" onclick ="handleLoadCard('${category.category_id}')" class="btn">${category.category}</button>
      `;

    categoryButtonContainer.appendChild(div);
  });
};

// Fetching Category Id
const handleLoadCard = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  const cardItem = data.data;
  console.log(cardItem);

  // console.log(categoryID);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  cardItem.forEach((card) => {
    let arr = [];
    const cardViewArray = Object.values(card?.others);
    console.log(cardViewArray);
    // console.log(cardView);
    const extractNumericViews = (views) => {
      const sliceValue = views.slice(0, -1);
      return parseFloat(sliceValue); // Remove the last character ("k")
    };
    // cardViewArray.sort((a, b) => {
    //   const viewsA = extractNumericViews(a.cardView);
    //   const viewsB = extractNumericViews(b.cardView);

    //   return viewsB - viewsA; // Compare in descending order
    // });
    // console.log(extractNumericViews(cardViewArray));

    const postedTime = card?.others?.posted_date;
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
    <div class="mb-2 p-1 ">
      <img class = " h-[200px] w-auto rounded-xl" src="${
        card?.thumbnail
      }" alt="" />
      <div class="relative">
            <p
              class="absolute left-40 bottom-2 text-white bg-[#171717] px-2 py-1 rounded-lg text-xs"
            >
              ${postedTime ? secondsToHoursAndMinutes(postedTime) : ""}
            </p>
          </div>
    </div>
    <div class="flex gap-2 mt-4">
      <img class = "rounded-full w-[40px] h-[40px] mt-4" src="${
        card?.authors[0]?.profile_picture
      }" alt="" />
      <div class="flex-1">
        <h4 class="text-base font-bold text-[#171717] mt-2">
          ${card?.title}
        </h4>
        <p  class="text-sm text-[#171717] font-medium mt-2 mb-2 flex gap-4">
          <span>${card?.authors[0]?.profile_name}</span> <span >${
      card?.authors[0]?.verified
        ? `<img src="images/fi_10629607.png" alt="" />`
        : " "
    } </span>
        </p>
        <p class="text-sm text-[#171717] font-medium">${
          card?.others?.views
        } views</p>
      </div>
    </div>
  </div>
    `;

    cardContainer.appendChild(div);
  });

  // For Sorting according to the Views:

  // Time Conversion
  function secondsToHoursAndMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    return `${hours}hrs ${minutes}min ago`;
  }

  // console.log(data.data);
  const handleDrawing = (categoryID) => {
    const drawingBtn = document.getElementById("drawing-btn");
    if (categoryID === "1005") {
      drawingBtn.classList.remove("hidden");
    } else {
      drawingBtn.classList.add("hidden");
    }
  };
  handleDrawing(categoryID);
};

loadCategory();
handleLoadCard("1000");
