import "./style.css";
import {
  useState,
  useEffect 
} 
from "react";

//this is to make a random number that is hidden or unknown//
const randomNumber = () => {
  const generateRandomNumber = Math.floor(Math.random() * 9000 + 1000);
  if (hiddenRandomNumber(generateRandomNumber)) {
    return generateRandomNumber;
  } else {
    return randomNumber;
  }
};

//this will check if there's a duplicate number or digit in the numbercombination//
const hiddenRandomNumber = (fourDigits) => {
  return !/(.).*?\1/.test(fourDigits);
};

const testInput = (randomNumber, inputData) => {
  let bull = 0;
  let cow = 0; //loops
  for (let i = 0; i < randomNumber.length; i++) { //
    if (
      inputData.includes(randomNumber[i]) &&
      randomNumber[i] === inputData[i]
    ) {
      bull++;
//if player got the correct answer//
      if (bull === 4) {
        return alert("4 STRAIGHT BULLS!");
      }
    } else if (inputData.includes(randomNumber[i])) {
      cow++;
    }
  }
  return {
    inputData: inputData,
    bull: bull,
    cow: cow,
  };
};


function App() {
  useEffect(() => {
    setgenerated(randomNumber());
  }, []);

  const [generatedNumber, setgenerated] = useState(0);
  const [checkBull, setcheckBull] = useState(0);
  const [checkCow, setcheckCow] = useState(0);
  const [inputData, setData] = useState("");
  const [historyInput, sethistoryInput] = useState([]);
  
//alerts//
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData === "") {
      return alert("You have to guess a number.");
    } else if (inputData.length < 4) {
      return alert("You're missing a number.");
    }

  
    const testresult = testInput(generatedNumber.toString(), inputData);
    setcheckBull(testresult.bull);
    setcheckCow(testresult.cow);

    if (historyInput.length === 0) {
      sethistoryInput([
        testresult,
      ]);
    } else {
      sethistoryInput((history) => [
        ...history,
        testresult,
      ]);
    }
  };

  
  const handleInput = (e) => {
    console.log(e.target.value);
    setData(e.target.value);
  };

  //JSX
  return (
    <div className='main'>
      <div className='main-game'>
        <div className='main-header'>
          <h1>Bulls & Cows Game!</h1>
          <p></p>
        </div>
        <div className='main-input'>
          <form action=''>
            <input type='text' required maxLength='4' onChange={handleInput} />
            <button onClick={handleSubmit}>Guess!</button>
          </form>
        </div>
        <div className='main-display'>
        <div className='display-input'>
            <ul>
              {historyInput.map((history, index) => {
                return (
                  <li key={index}>
                    {history.inputData}
                    {/* {history.bull} {history.cow} */}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='display-result'>
            <h3>
              Bulls: {checkBull} Cows: {checkCow}
            </h3>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
export { randomNumber, hiddenRandomNumber, testInput };