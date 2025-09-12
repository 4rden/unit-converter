
const inputOne = document.getElementById('input-1')
const inputTwo = document.getElementById('input-2')
const unitOne = document.getElementById('unit-1')
const unitTwo = document.getElementById('unit-2')

const conversion = { 
  g : {
    g  : v => v,
    kg : v => v / 1000,
    lb : v => v / 453.592,
    oz : v => v / 28.3495
  },
  kg : {
    kg : v => v,
    g  : v => v * 1000,
    lb : v => v * 2.205,
    oz : v => v * 35.274
  },
  lb : {
    lb : v => v,
    g  : v => v * 453.592,
    kg : v => v / 2.205,
    oz : v => v * 16
  },
  oz : {
    oz : v => v,
    g  : v => v * 28.3495,
    kg : v => v / 35.274,
    lb : v => v / 16
  }
}


function trimInput(el) { 
  if(el.value.length > 3) 
    el.value = el.value.slice(0,5)
}

function calculate(from,to,unitFrom,unitTo) { 
  const formula = conversion[unitFrom.value][unitTo.value]

  if (from.value === "") { 
    to.value = ""
  } else {
    if (unitFrom.value === unitTo.value) {
        to.value = from.value
    } else {
      let result = formula(parseFloat(from.value))
      if (result % 1 === 0 || result > 1000) { 
        to.value = Math.floor(result)
      } else if (result > 100 && result % 1 != 0) {
        to.value = result.toFixed(1)
      } 
      else { 
        to.value = result.toFixed(2)
      }
    }
  }

  if (to.value.length > 5 && to.value < 1000000) { 
   to.value = (to.value / 1000) + 'K'
  } else if(to.value.length > 6) { 
    to.value = (to.value / 1000000).toFixed(2) + "M"
  }
}

inputOne.addEventListener("input", function () {this.value = this.value.replace(/[^0-9]/g, "")})
inputTwo.addEventListener("input", function () {this.value = this.value.replace(/[^0-9]/g, "")})
inputOne.addEventListener("input",() => {trimInput(inputOne),calculate(inputOne,inputTwo,unitOne,unitTwo)})
inputTwo.addEventListener("input",() => {trimInput(inputTwo),calculate(inputTwo,inputOne,unitOne,unitTwo)})
inputOne.addEventListener('click', () => { inputOne.value="",inputTwo.value = ""})
inputTwo.addEventListener('click', () => { inputTwo.value="", inputOne.value =""})

unitOne.addEventListener('change', () => {
  if (inputOne.value === "") { 
  } else {
  calculate(inputOne,inputTwo,unitOne,unitTwo)
  }
})

unitTwo.addEventListener('change', () => {
  if (inputTwo.value === "") { 
  } else {
  calculate(inputOne,inputTwo,unitOne,unitTwo)
  }
})
