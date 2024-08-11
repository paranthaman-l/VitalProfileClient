import React, { useEffect, useState } from 'react'
import QuestionService from '../../services/QuestionService';

const Question = ({qid}) => {
    const [question, setQuestion] = useState();
    useEffect(() => {
        const getTest = async () => {
            QuestionService.getQuestioin(qid).then((res) => {
                setQuestion(res.data);
            }).catch((e) => {
            });
        }
        getTest();
    }, [qid])
  return (
    <div className='flex'>
        <div className="">
            {question?.question?.questionTitle}
        </div>
        <div className="">
            {question?.options?.map((option,i)=>{
                return(
                    <p className='p-2 my-2 cursor-pointer bg-slate-100 '>{option.optionText}</p>
                )
            })}
        </div>
    </div>
  )
}

export default Question