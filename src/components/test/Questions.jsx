import React from 'react'

const Questions = ({ currentQuestion, setCurrentQuestion, questions }) => {

    return (
        <div className="flex">
            <div className='flex flex-col m-3'>
                {questions?.map((qid, i) => {
                    return (
                        <p key={qid} className={`p-2 px-3 cursor-pointer  font-semibold rounded-md my-3 text-white ${qid===currentQuestion ? "bg-blue-700" : "bg-gray-900"}`} onClick={() => setCurrentQuestion(qid)}>{i + 1}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Questions