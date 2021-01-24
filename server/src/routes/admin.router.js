const express = require("express");
const router = express.Router();
const { getUsersTable } = require("../services/usersService");

const paginationController = (req, _) => {
  let prevPage = req.app.locals.prevPage ?? 1;
  let currPage = req.query.page ?? prevPage;

  if (parseInt(currPage)) {
    currPage = parseInt(currPage);
    req.app.locals.prevPage = currPage;
  } else {
    currPage = req.app.locals.prevPage;
  }
  return currPage;
};

// Admin Controllers

const getAdminController = async (req, res) => {
  const currPage = paginationController(req, res);
  const sortBy = req.query.sort && req.query.sort.split(",");
  const search = req.query.search && req.query.search.split(":");
  const query =
    req.query &&
    Object.keys(req.query).reduce((res, key) => {
      if (key === "page") return res;
      res.push(`${key}=${req.query[key]}`);
      return res;
    }, []);

  try {
    const [tableHeads, tableRows, pageCount, sorted] = await getUsersTable(currPage, sortBy, search);

    const templateParams = {
      title: "Administrator page",
      tableHeads,
      tableRows,
      sorted,
      currPage,
      pageCount,
      dotsIdx: [currPage - 2, currPage + 2],
      buttonsIdx: [currPage - 1, currPage, currPage + 1],
      query: query.join("&"),
    };

    if (req.header("X-Async-Request") === "async/html") {
      return res.render("partials/admin-table", { ...templateParams, layout: false });
    }

    return res.render("admin", templateParams);
  } catch (error) {
    console.log(error);
  }
};

// Admin Route

router.route("/").get(getAdminController);

module.exports = router;
