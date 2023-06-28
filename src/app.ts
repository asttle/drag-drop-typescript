/// <reference path ='components/project-input.ts' />

/// <reference path ='components/project-list.ts' />

console.log("Drag and drop project");
namespace App {
  new ProjectInput();
  new ProjectListClass("active");
  new ProjectListClass("finished");
}
