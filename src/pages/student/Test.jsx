import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TestService from '../../services/TestService';
import Loader from '../../components/common/Loader'
import Questions from '../../components/test/Questions';
import Question from '../../components/test/Question';
const Test = () => {
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [isFullScreenMode, setIsFullScreenMode] = useState(false);
    const { tid } = useParams();
    const [test, setTest] = useState();
    useEffect(() => {
        const getTest = async () => {
            TestService.GetTest(tid).then((res) => {
                setTest(res.data);
                setCurrentQuestion(res.data.sections[0].questions[0]);
            }).catch((e) => {

            });
        }
        getTest();
    }, [tid])

    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        const handleKeydown = async (e) => {
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
                e.preventDefault();
            }
            else if (e.key === 'F11') {
                await document.documentElement.requestFullscreen();
                setIsFullScreenMode(true);
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);
    const enterFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
            setIsFullScreenMode(true);
        }
    };
    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            setIsFullScreenMode(false);
        }
    };
    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);
    // COUNT TAB SWITCHES
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitchCount((prevCount) => prevCount + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    useEffect(() => {
        // Optionally, send the tabSwitchCount to your server or log it
        // console.log(`Tab switch count: ${tabSwitchCount}`);
    }, [tabSwitchCount]);

    return (
        <div className="relative">
            {test ? (
                <>
                    <div className="flex">
                        <Questions currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} questions={test.sections[1].questions} />
                        <Question qid={currentQuestion} />
                    </div>
                    {!isFullScreenMode && (
                        <div className="absolute top-0 left-0 min-h-screen min-w-full bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="p-24 px-32 bg-white rounded-3xl flex justify-evenly h-3/4 items-center flex-col">
                                <p className='text-lg mb-5'>Start Test in Full-Screen</p>
                                <button onClick={enterFullScreen} className='py-2 px-3 bg-blue-600 text-white font-semibold font-sans rounded-sm'>Enable Full-Screen</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default Test