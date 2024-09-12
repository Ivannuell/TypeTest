/// <reference types="node" />

import Results from "./components/Results";
import Test from "./components/Test";
import useTest from "./hooks/useTest";

function App() {
  const {
    input,
    word,
    timeLeft,
    timeActive,
    showingResults,
    errorCount,
    handleInputChange,
    resetTest,
    retryTest,
    wpm,
    accuracy
  } = useTest();

  document.getElementById('inputfield')?.focus();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center space-y-6 bg-gray-900 text-white min-h-screen">

      {!showingResults ? (
        <Test
          words={word}
          input={input}
          handleInputChange={handleInputChange}
          timeActive={timeActive}
          timeLeft={timeLeft}
          resetTest={resetTest}
        />
      ) : (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          errors={errorCount}
          resetTest={retryTest}
        />
      )}
    </div>
  );
}

export default App;
