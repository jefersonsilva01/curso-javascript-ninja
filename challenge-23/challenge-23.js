/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

(function () {
  "use strict";

  const input = document.querySelector("input");

  const buttons = document.querySelectorAll("button");

  const symbols = { "+": "+", "-": "-", "*": "*", "/": "/" };

  let numbersForCalc = [];

  let lastNumber = "";
  let lastSymbol = "";

  function clear() {
    input.value = "0";
    numbersForCalc = [];
    lastSymbol = "";
    lastNumber = "";
  }

  function calcValue(numbersForCalc) {
    let num1 = "", num2 = "", op = ""

    function calc(num1, op, num2) {
      switch (op){
        case "+":
          return num1 + num2;
          break;

        case "-":
          return num1 - num2;
          break;

        case "*":
          return num1 * num2;
          break;

        case "/":
          return num1 / num2;
          break;
      }
    }

    numbersForCalc.forEach(function(item){

      if (!symbols[item] && num1 === ""){
        num1 = Number(item);
      } else if (symbols[item]) {
        op = item;
      } else if (!symbols[item] && num1 !== "") {
        num2 = Number(item);
      }

      if(op !== "" && num2 !== ""){
        num1 = calc(num1, op, num2)
      }

      clear();
      input.value = num1
      lastNumber = num1;
    })
  }

  function checkValue(value) {
    if (value === "CE") return clear();
    if (value === "=") {
      numbersForCalc.push(lastNumber)
      return calcValue(numbersForCalc);
      ;
    }

    // Check if input equals 0 and input is 0 or symbol
    if (input.value === "0" && !symbols[value] && value !== "0") {
      input.value = value;
      lastNumber += value;


    } else if (input.value !== "0") {

      // Checl if input is symbol and save number for calc
      if(symbols[value] && lastSymbol === "") {
        lastSymbol = value;
        numbersForCalc.push(lastNumber);
        lastNumber = ""
        input.value += value;

      // Check if input symbol change and update
      } else if (symbols[value] && lastSymbol !== "") {
        lastSymbol = value
        input.value = input.value.slice(0, -1) + value;
      }

      // Check if input is number and store symbol for calc
      if(!symbols[value] && lastSymbol !== "") {
        numbersForCalc.push(lastSymbol)
        lastSymbol = "";
        lastNumber += value;
        input.value += value;

      // Only update number
      } else if (!symbols[value]){
        lastNumber += value;
        input.value += value;
      }
    }
  }


  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.innerHTML;

      checkValue(value);
    });
  });

})();
