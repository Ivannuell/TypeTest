export interface WordsProp {
    words: { char: string, class: string }[]
}

function Words({ words }: WordsProp) {
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="word text-gray-300 font-mono text-lg leading-relaxed tracking-wide" id="letterContainer">
                {words.map((letter, index) =>
                    <span
                        className={`${letter.class} letter`}
                        key={index}
                    >
                        {letter.char}
                    </span>)
                }
            </div>
        </div>
    )
}

export default Words