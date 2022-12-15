"use strict";

const searchForm = document.querySelector("form");
const searchIcon = document.querySelector(".search__button");
const searchInput = document.querySelector('.search').value;
const searchResultDiv = document.querySelector(".search-results");
let query;
let template = "";
const templateHTML = (data) => {
//   console.log(data.map(e=>e.meals.strMeal));
console.log(data.meals);
  data.meals.map((item) => {

    template += `
        <div class="item">
            <img src="${item.strMealThumb}" alt="recipe" />
            <div class="link__title">
            <h1 class="title">${item.strMeal}</h1>
            <button class="view-button">Read more</button>
            </div>           
        </div>
        `;
  });
  searchResultDiv.insertAdjacentHTML("beforeend", template);
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
  if(document.querySelector("input").value !==  "") (fetchData())
  else searchResultDiv.innerHTML = `<p>Input field can not be empty</p>`
});
 