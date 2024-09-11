/// <reference types="node" />

import Test from "./components/Test";
import useTest from "./hooks/useTest";

function App() {
  const {
    input,
    word,
    timeLeft,
    isActive,
    errorCount,
    handleInputChange,
    resetTest,
    wpm,
    accuracy
  } = useTest();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center space-y-6 bg-gray-900 text-white min-h-screen">
      <div className="text-2xl font-bold">Time left: {timeLeft}s</div>

      <Test
        words={word}
        input={input}
        handleInputChange={handleInputChange}
        isActive={isActive}
        timeLeft={timeLeft}
        resetTest={resetTest}
        wpm={wpm}
        accuracy={accuracy}
      />

      <div className="text-xl">Total Errors: {errorCount}</div>
    </div>
  );
}

export default App;
