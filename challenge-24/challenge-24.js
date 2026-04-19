/*
Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
o código, conforme vimos na aula anterior. Quebrar as responsabilidades
em funções, onde cada função faça somente uma única coisa, e faça bem feito.

- Remova as duplicações de código;
- agrupe os códigos que estão soltos em funções (declarações de variáveis,
listeners de eventos, etc);
- faça refactories para melhorar esse código, mas de forma que o mantenha com a
mesma funcionalidade.
*/

let visor = document.querySelector('[data-js="visor"]');
let buttons = document.querySelectorAll('button');

const operations = {'+': '+', '-': 'x', '÷': '÷', 'x': 'x'};
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const clear = () => visor.value = 0;

const isLastItemAnOperation = () => operations[visor.value.split('').pop()];

const removeLastItemIfItIsAnOperator = (value) => {
  if(isLastItemAnOperation()) return value.slice(0, -1);

  return value;
}
const valuesForCalc = () => visor.value.match(/\d+[+x÷-]?/g);

const calc = (firstValue, lastValue, operator, lastOperator) => {
  const operationsCalc = {
    '+': ( firstValue + lastValue ) + lastOperator,
    '-': ( firstValue - lastValue ) + lastOperator,
    'x': ( firstValue * lastValue ) + lastOperator,
    '÷': ( firstValue / lastValue ) + lastOperator,
  }

  return operationsCalc[operator];
}

const handleCalc = () => {
  visor.value = removeLastItemIfItIsAnOperator(visor.value);

  let allValues = valuesForCalc();

  visor.value = allValues.reduce((accumulated, actual) => {
    let firstValue = Number(accumulated.slice(0, -1));
    let operator = accumulated.split('').pop();
    let lastValue = Number(removeLastItemIfItIsAnOperator(actual));
    let lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';

    return calc(firstValue, lastValue, operator, lastOperator);
  });
}

const checkValue = value => {
  if (value === "ce") return clear();

  if (operations[value]) {
    visor.value = removeLastItemIfItIsAnOperator(visor.value);
    visor.value += value;
    return;
  }

  if (numbers[value]) return visor.value += value;

  if (value === "=") return handleCalc(visor.value);
}

buttons.forEach(button => button
  .addEventListener('click', () => checkValue(button.value)));
