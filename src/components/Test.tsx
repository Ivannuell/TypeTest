import Words from "./Words"
import InputField from "./InputField";
import type { WordType } from "../utils/types";

interface TestProps {
    words: WordType[];
    input: string;
    timeActive: boolean;
    timeLeft: number;
    resetTest: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

function Test({
    words,
    input,
    handleInputChange,
    timeActive,
    timeLeft,
    resetTest,
    inputRef

}: TestProps) 

{
    

    return (
        <>
            <div className="text-2xl font-bold">Time left: {timeLeft}s</div>

            <Words words={words} />

            <InputField
                input={input}
                handleInputChange={handleInputChange}
                isDisabled={timeActive && timeLeft < 0}
                inputRef={inputRef}
            />

            <button
                onClick={resetTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
                New Test
            </button>
        </>
    )
}

export default Test