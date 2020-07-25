import { Post } from "@models/post";
import "../webpack/styles/styles.css";
import json from "./assets/json.json";
import logo from "@/assets/256.png";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";

import "./styles/less.less";
import "./styles/scss.scss";

import * as $ from "jquery";

import React from "react";
import { render } from "react-dom";

import "./babel";

// console.log("json=", json);
// console.log("xml=", xml);
// console.table("csv=", csv);

const post = new Post("webpack post title", logo);

$("pre").addClass("code2").html(post.toString());

// console.log("post", post);

// console.log("post to string", post.toString());
const App = () => <h1>App</h1>;
render(<App />, document.getElementById("app"));

const unusedVar = "unusedVar";
