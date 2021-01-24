import "./assets/fonts/Roboto-Regular.ttf";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import $ from "jquery";
import "bootstrap/js/dist/dropdown";
import "./styles/admin.scss";
import { searchBy, sortBy } from "./services/restService";
import { debounce } from "./utils/index";

$(function (e) {
  let searchByColumnIdx = "";
  $(".search-panel .dropdown-menu")
    .find("a")
    .on("click", function (e) {
      e.preventDefault();
      searchByColumnIdx = $(this).attr("href").replace("#", "");
      const searchByColumnName = $(this).text();
      $(".search-panel span#search-filter").text(searchByColumnName);
    });

  let searchHandler = function (e) {
    const searchText = $(this).val();
    searchBy(searchByColumnIdx, searchText)
      .then((htmlResponse) => {
        if (htmlResponse) {
          $("#table-container").html(htmlResponse);
        }
      })
      .then(() => addClickHandlers());
  };
  searchHandler = debounce(searchHandler);
  $("#search-query").on("input", searchHandler);

  const onClickHandler = function ({ target: currColumn }) {
    let currColumnIndex = $(currColumn).data("sort-index");
    let currColumnOrder = 1;

    if ($(currColumn).data("sort-order") === 1) currColumnOrder = -1;
    if ($(currColumn).data("sort-order") === -1) currColumnOrder = 0;

    sortBy(currColumnIndex, currColumnOrder)
      .then((htmlResponse) => {
        if (htmlResponse) {
          $("#table-container").html(htmlResponse);
        }
      })
      .then(() => addClickHandlers());
  };

  function addClickHandlers() {
    $("#users-table .table-head").on("click", onClickHandler);
  }
  addClickHandlers();
});
