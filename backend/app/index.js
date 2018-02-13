if (process.env.NODE_ENV === "development") {
  require("babel-register");
  require("dotenv").config({ silent: true });
}
require("./app");
