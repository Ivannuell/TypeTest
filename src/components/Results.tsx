
interface ResultsProps {
  wpm: number;
  accuracy: number;
}

function Results({ wpm, accuracy }: ResultsProps) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Test Results</h2>
      <div className="flex justify-between">
        <div className="text-center p-4 bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-300">WPM</h3>
          <p className="text-3xl font-bold text-blue-100">{wpm}</p>
        </div>
        <div className="text-center p-4 bg-green-900 rounded-lg">
          <h3 className="text-lg font-semibold text-green-300">Accuracy</h3>
          <p className="text-3xl font-bold text-green-100">{accuracy}%</p>
        </div>
      </div>
    </div>
  );
}

export default Results;