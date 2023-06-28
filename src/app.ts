import { ProjectInput } from "../src/components/project-input.js";
import { ProjectListClass } from "../src/components/project-list.js";

console.log("Drag and drop project");

new ProjectInput();
new ProjectListClass("active");
new ProjectListClass("finished");
