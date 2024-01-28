type NumberorString = string | Number;

// function printId(id: (number | string)) {
function printId(id: NumberorString) {
  console.log(`ID: ${id}`)
}

printId(101);
printId("343")