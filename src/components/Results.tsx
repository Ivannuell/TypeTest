interface ResultsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  resetTest: () => void;
}

function Results({ wpm, accuracy, errors, resetTest }: ResultsProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Test Results</h2>
        <div className="flex justify-evenly mb-6">
          <div className="text-center p-4 bg-blue-900 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300">WPM</h3>
            <p className="text-3xl font-bold text-blue-100">{wpm}</p>
          </div>
          <div className="text-center p-4 bg-green-900 rounded-lg">
            <h3 className="text-lg font-semibold text-green-300">Accuracy</h3>
            <p className="text-3xl font-bold text-green-100">{accuracy}%</p>
          </div>
          <div className="text-center p-4 bg-red-900 rounded-lg">
            <h3 className="text-lg font-semibold text-red-300">Errors</h3>
            <p className="text-3xl font-bold text-red-100">{errors}</p>
          </div>
        </div>
        <button
          onClick={resetTest}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          New Test
        </button>
      </div>
    </div>
  );
}

export default Results;