export interface WordsProp {
    words: {
        char: string,
        class: string
    }[]
}

function Words({ words }: WordsProp) {

    return (
        <div className="word text-gray-300 font-mono text-lg leading-relaxed tracking-wide">
            {words.map((letter, index) =>
                <span
                    className={`${letter.class}`}
                    key={index}
                >
                    {letter.char}
                </span>)}
        </div>
    )
}

export default Words