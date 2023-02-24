import logo from './logo.svg'
import React from 'react';
import './App.css';

function Numpad(props){

    console.log(props);

    console.log("hello darkness my old friend");

    return (
      <div className="numpad">
  
            <button id="AC" className="numpad__button" onClick = {() => props.handleInput("AC")}>AC</button>
            <button id="divide" className="numpad__button" onClick = {() => props.handleInput("/")}>/</button>
            <button id="multiply" className="numpad__button" onClick = {() => props.handleInput("*")}>*</button>
   


            <button id="seven" className="numpad__button" onClick = {() => props.handleInput(7)}>7</button>
            <button id="eight" className="numpad__button" onClick = {() => props.handleInput(8)}>8</button>
            <button id="nine" className="numpad__button" onClick = {() => props.handleInput(9)} >9</button>
            <button id="subtract" className="numpad__button" onClick = {() => props.handleInput("-")}>-</button>
      
          

            <button id="four" className="numpad__button" onClick = {() => props.handleInput(4)}>4</button>
            <button id="five" className="numpad__button" onClick = {() => props.handleInput(5)}>5</button>
            <button id="six" className="numpad__button" onClick = {() => props.handleInput(6)}>6</button>
            <button id="addition" className="numpad__button" onClick = {() => props.handleInput("+")}>+</button>

 
          
            <button id="one" className="numpad__button" onClick = {() => props.handleInput(1)}>1</button>
            <button id="two" className="numpad__button" onClick = {() => props.handleInput(2)}>2</button>
            <button id="three" className="numpad__button" onClick = {() => props.handleInput(3)}>3</button>
            <button id="equals" className="numpad__button" onClick = {() => props.handleInput("=")}>=</button>
          
  
            <button id="zero" className="numpad__button" onClick = {() => props.handleInput(0)}>0</button>
            <button id="decimal" className="numpad__button" onClick = {() => props.handleInput(".")}>.</button>
       
      </div>
    );
}

function Display(props){

  /* function evaluateExpression() {
    console.log(props.topNum)
  } */

  console.log(props);

  return (
    <div className="display">
      <div className="display__input">{props.topNum}</div>
      <div className="display__output">{props.bottomNum}</div>
    </div>
  )
}

let operationComplete = false; 
let reset = false;

function Calculator() {

  let [operation, setOperation] = React.useState("");
  let [output, setOutput] = React.useState(0);

  let symbols = ["+", "-", "*", "/"];
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
  let literalNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  let solution = 0;



  function retrieveInput(symbol) {

    //This is the top string or the input string.

    function topString(symbol, reset) {

      console.log(reset)

      if (reset === true) {
        console.log("This is working properly");

        setOperation(symbol);
        reset = false;

      }
      else if (reset === false) {
        if (symbol === "=") {
          //console.log(eval(operation));
          solution = eval(operation);
          console.log(solution);
          if (solution === undefined) {
            solution = "NaN";
          }
          
          setOperation((prevOperation) => {
            return (prevOperation + "=" + solution);
          });
        }
        else {
         
          //console.log(operation);
          setOperation(prevOperation => {

            if (prevOperation === "0" && literalNumbers.includes(symbol)) {
              prevOperation = "";
            }
            else if (prevOperation === "0" && symbol === 0) { 
              console.log("Does this fire !!!");
              prevOperation = "";
            }
            else if (symbols.includes(prevOperation[prevOperation.length-1]) && symbol === ".") {
              prevOperation = prevOperation.slice(0, prevOperation.length) + "0";
            }
            else if (symbols.includes(prevOperation[prevOperation.length-1]) && symbols.includes(symbol)) {
              prevOperation = prevOperation.slice(0, prevOperation.length-1);
            }
            else if (prevOperation[prevOperation.length-1] === "." && symbol === ".") {
              prevOperation = prevOperation.slice(0, prevOperation.length-1);
            }
            else if (prevOperation.length === 17 && symbols.includes(symbol)) {
              symbol = symbol;
            }
            else if (prevOperation.length === 17) {
              symbol = "";
            }
            

            return (prevOperation.toString() + symbol);
          });
        }
      }
    
    }

    //This is gonna be used to detect changes in state of the output string.

    

    //This is the bottom string or the output string. 

    let firstNum = false; 

    function bottomString(symbol) {

      console.log(numbers.includes(symbol))

      if (operationComplete === false) {
        if (symbol != "=") {
          if (symbols.includes(symbol)) {
            setOutput(symbol);
          }
          else if (numbers.includes(symbol)) {
  
            setOutput((prevOutput) => {

              console.log(prevOutput.length);

              if (prevOutput === "0" && literalNumbers.includes(symbol)) {
                console.log("So this is working right");
                prevOutput = "";
                console.log(prevOutput);
                
              }
              else if (symbols.includes(prevOutput) && symbol === ".") {
                prevOutput = prevOutput.slice(0, prevOutput.length-1) + "0";
              }
              else if (prevOutput === "+" || prevOutput === "-" || prevOutput === "*" || prevOutput === "/") {
              
                prevOutput = "";
              }
              else if ((prevOutput === 0 && symbol === ".") || (prevOutput === "0." && symbol === ".")) {
                console.log("This is firing correctly");
                setOperation("0.")
                prevOutput = "0";
              }
              else if (prevOutput === 0 || prevOutput === "0" && symbol == "0") {
                prevOutput = "";
              }
              else if (symbols.includes(prevOutput[prevOutput.length-1]) && symbol === ".") {
                prevOutput = prevOutput.slice(0, prevOutput.length-1) + "0.";
              }
              else if(prevOutput.length === 17) {
              let temp = prevOutput;
              prevOutput = "DIGIT LIMIT MET"
              symbol = "";
              setTimeout(() => {
                setOutput(temp);
              }, 1000)
              }
              
              return (prevOutput.toString() + symbol.toString());
            })
          }
        }
        else if (symbol === "=") {
          solution = solution.toString();

          if (solution.length >= 14) {
            solution = solution.slice(0, 14);
            setOutput(solution);
          }
          else {
            setOutput(solution);
          }

          operationComplete = true; 
        }
      }

      else if (operationComplete == true) {
        
        if (numbers.includes(symbol)) {
     
          if (symbol === ".") {
            setOperation("0.");
            setOutput("0.");
            operationComplete = false; 
          }
          else {

            //setOperation(symbol)
            topString(symbol, true);
            setOutput(symbol);
            operationComplete = false;
          }
  
        }
        else if (symbols.includes(symbol)) {
          console.log("This fires too");
          setOperation(output + symbol);
          setOutput(symbol);
          operationComplete = false;
        }
      }
    }

    if (symbol != "AC") {
      topString(symbol, false)
      bottomString(symbol)
    }
    else if (symbol === "AC") {
      setOperation("");
      setOutput(0);
    }
  }

  return (
    <div className="calculator">
      <Display topNum = {operation} bottomNum = {output}/>
      <Numpad handleInput = {retrieveInput}/>
    </div>
  )
}

function App() {
    return (
        <div className="App">
          <Calculator /> 
          <div id="credits">
            <p>Designed and Coded By Michael Galan</p>
          </div>
        </div>
      
    );
  }

export default App;

