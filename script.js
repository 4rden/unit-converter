const input = document.getElementById("number-input");

input.addEventListener("input", () => {
  let val = input.value;

  if (val.length > 3) {
    input.value = val.slice(0, -1);
  }})