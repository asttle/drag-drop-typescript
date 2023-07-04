import { ProjectInput } from "./components/project-input.js";
import { ProjectListClass } from "./components/project-list.js";

console.log("Drag and drop project");

new ProjectInput();
new ProjectListClass("active");
new ProjectListClass("finished");
