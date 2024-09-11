import Words from "./Words"
import InputField from "./InputField";
import type { WordType } from "../utils/types";
import Results from "./Results";

interface TestProps {
    words: WordType[];
    input: string;
    isActive: boolean;
    timeLeft: number;
    wpm: number;
    accuracy: number;
    resetTest: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Test({
    words,
    input,
    handleInputChange,
    isActive,
    timeLeft,
    resetTest,
    wpm,
    accuracy

}: TestProps) 

{
    return (
        <>
            <Words words={words} />

            <InputField
                input={input}
                handleInputChange={handleInputChange}
                isDisabled={isActive && timeLeft < 0}
            />

            <button
                onClick={resetTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
                New Test
            </button>

            <Results wpm={wpm} accuracy={accuracy} />
        </>
    )
}

export default Test