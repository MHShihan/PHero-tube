const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryData = data.data;
  //   console.log(categoryData);
  const categoryButtonContainer = document.getElementById(
    "dynamic-button-container"
  );
  categoryData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick ="handleLoadCard('${category.category_id}')" class="btn">${category.category}</button>
      `;
    categoryButtonContainer.appendChild(div);
  });
};

const handleLoadCard = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.data.forEach((card) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
    <div class="mb-2 p-1">
      <img class = "h-[200px] rounded-xl" src="${card?.thumbnail}" alt="" />
    </div>
    <div class="flex gap-2 mt-4">
      <img class = "rounded-full w-1/6 h-1/6" src="${card?.authors[0]?.profile_picture}" alt="" />
      <div class="flex-1">
        <h4 class="text-base font-bold text-[#171717] mt-2">
          Building a Winning UX Strategy Using the Kano Model
        </h4>
        <p class="text-sm text-[#171717] font-medium mt-1">
          <span>Awlad Hossain</span>
        </p>
        <p class="text-sm text-[#171717] font-medium">91K views</p>
      </div>
    </div>
  </div>
    `;
    cardContainer.appendChild(div);
  });
  console.log(data.data);
};

loadCategory();
handleLoadCard("1000");
