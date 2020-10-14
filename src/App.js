import { createElement } from "react";
import { render } from "react-dom";
import Pet from "./Pet";

function App() {
  return createElement("div", {}, [
    createElement("h1", {}, ""),
    createElement(Pet, { name: "Luna", animal: "Dog", breed: "Husky" }),
    createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockatiel",
    }),
    createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mixed" }),
  ]);
}

render(createElement(App), document.getElementById("root"));
