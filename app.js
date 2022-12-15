"use strict";

const searchForm = document.querySelector("form");
const searchIcon = document.querySelector(".search__button");
const searchInput = document.querySelector(".search").value;
const searchResultDiv = document.querySelector(".search-results");
let query;

const templateHTML = (data) => {
  let template = "";
  console.log(data.meals);
  data.meals.map((item) => {
    template += `
        <div class="item" data-id = "${item.idMeal}">
            <img src="${item.strMealThumb}" alt="recipe" />
            <div class="link__title">
              <h1 class="title">${item.strMeal}</h1>
              <button class="view-button recipe-btn">Read more</button>
            </div>           
        </div>
        `;
  });
  searchResultDiv.innerHTML = template;
};

const fetchData = async () => {
  query = document.querySelector("input").value;
  console.log(query);
  const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
  console.log(baseURL);
  const response = await fetch(baseURL);
  const data = await response.json();

  try {
    templateHTML(data);
  } catch (err) {
    renderError(`There is no recipe for this dish, please try again!!!`);
  }
};

const renderError = function (msg) {
  const errMsg = `
    <p class = "pErr">${msg} </p>
    <br>
    <br>
    <img class = "imgErr" src = "https://media.istockphoto.com/id/1304883313/photo/empty-plate-and-dinner-on-dark-wooden-table.jpg?s=612x612&w=0&k=20&c=9x3dElSmV-2bICHMfefZC51hBVOfBZT-6s8DPGCZKKE=">
    `;
  searchResultDiv.innerHTML = errMsg;
};

searchIcon.addEventListener("click", () => {
  document.querySelector("input").value !== ""
    ? fetchData()
    : (searchResultDiv.innerHTML = `<p>Input field can not be empty</p>`);
});

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});
