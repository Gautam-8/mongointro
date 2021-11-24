const express = require("express");
const mongoose = require("mongoose");

const app = express();



app.listen(4567, () => {
    console.log("listening on port 4567")
})
