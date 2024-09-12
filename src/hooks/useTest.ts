import { useEffect, useRef, useReducer, useLayoutEffect, useCallback } from "react";
import { sentence } from "@ndaidong/txtgen";
import type { WordType } from "../utils/types";

// TODO: Refactor to separate test and result states

type TestState = {
    input: string;
    word: WordType[];
    timeLeft: number;
    timeActive: boolean;
    showingResults: boolean;
    errorCount: number;
    wpm: number;
    accuracy: number;
};

type TestAction =
    | { type: 'START_TEST' }
    | { type: 'END_TEST' }
    | { type: 'RESET_TEST' }
    | { type: 'SET_INPUT'; payload: string }
    | { type: 'DECREMENT_TIME' }
    | { type: 'INCREMENT_ERROR' }
    | { type: 'SET_WORD'; payload: WordType[] }
    | { type: 'RETRY_TEST' };

function testReducer(state: TestState, action: TestAction): TestState {
    switch (action.type) {
        case 'START_TEST':
            return { 
                ...state, 
                timeActive: true, 
                showingResults: false, 
                timeLeft: 60, 
                errorCount: 0 
            };
        case 'END_TEST':
            return { 
                ...state, 
                timeActive: false, 
                showingResults: true, 
                timeLeft: 60, 
                input: '', 
                word: newWords(), 
                wpm: calculateWPM(state), 
                accuracy: calculateAccuracy(state) 
            };
        case 'RESET_TEST':
            return { 
                ...state, 
                input: '', 
                timeLeft: 60, 
                timeActive: false,
                errorCount: 0,
                word: newWords(),
                wpm: 0,
                accuracy: 0
            };
        case 'RETRY_TEST':
            return {
                ...state,
                timeActive: false,
                showingResults: false,
                timeLeft: 60,
                errorCount: 0
            };


        case 'SET_INPUT':
            return { ...state, 
                input: action.payload 
            };
        case 'SET_WORD':
            return { 
                ...state, 
                word: action.payload 
            };


        case 'DECREMENT_TIME':
            return { 
                ...state, 
                timeLeft: state.timeLeft - 1 
            };
        case 'INCREMENT_ERROR':
            return {
                ...state,
                errorCount: state.errorCount + 1
            };
        default:
            return state;
    }
}

function newWords(): WordType[] {
    const words = sentence();
    return words.split('').map((letter, index) => ({
        char: letter,
        class: '',
        id: index
    }));
}

function calculateWPM(state: TestState): number {
    const wordsPerMinute = (state.input.length - state.errorCount / 5) / (60 / state.timeLeft);
    return Math.round(wordsPerMinute);
}

function calculateAccuracy(state: TestState): number {
    const accuracy = ((state.input.length - state.errorCount) / state.input.length) * 100;
    return Math.round(accuracy);
}


export default function useTest() {
    const [state, dispatch] = useReducer(testReducer, {
        input: '',
        word: newWords(),
        timeLeft: 60,
        timeActive: false,
        errorCount: 0,
        wpm: 0,
        accuracy: 0,
        showingResults: false
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        inputRef.current?.focus();
        // Highlight the first letter of each word
        const letterElements = document.querySelectorAll('.letter');
        letterElements.forEach((element, index) => {
            if (index === 0 ) {
                element.classList.add('bg-green-800');
            } 
        });
    }, [state.showingResults, state.word, state.input]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const previousWord = useRef<Array<{ char: string; class: string }>>([]);


    const handleWords = useCallback((input: string) => {
        const newWord = state.word.map((letter, index) => {
            if (letter.char === input[index]) {
                return { ...letter, class: 'text-green-500 correct' };
            } else if (input[index]) {
                if (previousWord.current[index]?.class !== 'text-red-500 incorrect') {
                    dispatch({ type: 'INCREMENT_ERROR' });
                }
                return { ...letter, class: 'text-red-500 incorrect' };
            }
            return { ...letter, class: '' };
        });

        previousWord.current = newWord;

        // Add background highlight to the current letter
        const currentLetterIndex = input.length;
        if (currentLetterIndex < newWord.length) {
            newWord[currentLetterIndex] = {
                ...newWord[currentLetterIndex],
                class: `${newWord[currentLetterIndex].class} bg-green-800`
            };
        }


        return newWord;
    }, [state.word, dispatch, previousWord]);


    //decrement time every second
    useEffect(() => {
        if (state.timeActive && state.timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                dispatch({ type: 'DECREMENT_TIME' });
            }, 1000);
        } else if (state.timeLeft <= 0) {
            endTest();
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [state.timeActive, state.timeLeft]);

    //start test if input is not empty and time is not active
    useEffect(() => {
        if (state.input.length === 1 && !state.timeActive) {
            dispatch({ type: 'START_TEST' });
            
        }

        if (state.input.length > 0) {
            const firstLetter = document.getElementsByClassName('letter')[0];
            firstLetter?.classList.remove('bg-green-800');
        }

        document.getElementById('inputfield')?.focus();

    }, [state.input, state.timeActive]);

    //This is called when the user types in the input field
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (state.timeLeft > 0 && e.target.value.length <= state.word.length) {
            dispatch({ type: 'SET_INPUT', payload: e.target.value });
            dispatch({ type: 'SET_WORD', payload: handleWords(e.target.value) });
            
            if (e.target.value.length >= state.word.length) {
                endTest();
            }
            inputRef.current?.focus()
        }
    }

    function resetTest() {
        dispatch({ type: 'RESET_TEST' });
        previousWord.current = [];
    }

    function retryTest() {
        dispatch({ type: 'RETRY_TEST' });
        previousWord.current = [];
    }

    function endTest() {
        dispatch({ type: 'END_TEST' });
        if (timerRef.current) clearTimeout(timerRef.current);
    }

    function startTest() {
        dispatch({ type: 'START_TEST' });
        previousWord.current = [];
    }


    

    return {
        ...state,
        handleInputChange,
        resetTest,
        startTest,
        retryTest,
        inputRef
    };
}
