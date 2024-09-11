import Words from "./Words"
import InputField from "./InputField";
import type { WordType } from "../types/types";

interface TestProps {
    words: WordType[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isActive: boolean;
    timeLeft: number;
    resetTest: () => void;
}

function Test({ words, input, handleInputChange, isActive, timeLeft, resetTest }: TestProps) {
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                New Test
            </button>
        </>
    )
}

export default Test