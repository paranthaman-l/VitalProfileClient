import React, { useEffect, useState } from 'react';
import TestService from '../../services/TestService';

const Tests = () => {
    const [testWindow, setTestWindow] = useState(null);

    useEffect(() => {
        // Check if there's already an open test window on load
        const existingWindowName = localStorage.getItem('testWindowName');
        if (existingWindowName) {
            const existingWindow = window.open('', existingWindowName);
            if (existingWindow && !existingWindow.closed) {
                setTestWindow(existingWindow);
            } else {
                localStorage.removeItem('testWindowName');
            }
        }

        // Clean up on unmount
        return () => {
            if (testWindow) {
                localStorage.removeItem('testWindowName');
            }
        };
    }, [testWindow]);

    const handleTakeTest = (tid) => {
        if (testWindow && !testWindow.closed) {
            // Focus on the existing tab instead of opening a new one
            testWindow.focus();
        } else {
            // Otherwise, open a new test window and save the reference
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const width = Math.floor(screenWidth * 0.99);
            const height = Math.floor(screenHeight);
            const windowFeatures = `width=${width},height=${height}`;
            const newTestWindow = window.open(`/VitalProfileClient/test/${tid}`, '_blank', windowFeatures); // '_blank' opens the URL in a new tab
            const windowName = `testWindow_${Date.now()}`;
            newTestWindow.name = windowName;
            setTestWindow(newTestWindow);
            localStorage.setItem('testWindowName', windowName);
            // Listen for the new window being closed
            newTestWindow.onbeforeunload = () => {
                localStorage.removeItem('testWindowName');
                setTestWindow(null);
            };
        }
    };

    const [tests, setTests] = useState([]);

    useEffect(() => {
        const getAllTest = async () => {
            await TestService.GetAllTest()
                .then((res) => {
                    setTests(res.data);
                })
                .catch((e) => {
                    console.error(e);
                });
        };
        getAllTest();
    }, []);

    return (
        <div className="flex flex-col">
            {tests?.map((test) => (
                <div key={test.tid} className="flex my-10">
                    <div className="flex flex-col">
                        <p>{test?.testName}</p>
                        <div className="flex">
                            <p>{test?.startDateTime?.slice(0, 16)}</p>
                            <p>{test?.endDateTime?.slice(0, 16)}</p>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white font-semibold mx-10 p-2 rounded-xl"
                        onClick={() => handleTakeTest(test.tid)}
                    >
                        Take Test
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tests;
