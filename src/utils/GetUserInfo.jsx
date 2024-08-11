// import axios from "axios";

import axios from "axios";

export const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    
    let browser = 'Unknown';
    if (userAgent.match(/edg/i)) {
        browser = "MicroSoft Edge";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browser = "Firefox";
    } else if (userAgent.match(/opr\//i)) {
        browser = "Opera";
    } else if (userAgent.match(/chrome|chromium|crios/i)) {
        browser = "Chrome";
    } else if (userAgent.match(/safari/i)) {
        browser = "Safari";
    } else {
        browser = "Other";
    }
    return browser;
};

export const getOSInfo = () => {
    const userAgent = navigator.userAgent;
    let OSName = 'Unknown';

    if (userAgent.indexOf("Win") > -1) OSName = "Windows OS";
    if (userAgent.indexOf("Mac") > -1) OSName = "Macintosh OS";
    if (userAgent.indexOf("Linux") > -1) OSName = "Linux OS";
    if (userAgent.indexOf("Android") > -1) OSName = "Android OS";
    if (userAgent.indexOf("like Mac") > -1) OSName = "iOS OS";

    return OSName;
};

export const getIPAddress = async () => {
    // const { hostname } = window.location;
    // const ipRegex = /\d+\.\d+\.\d+\.\d+/;
    // const match = ipRegex.exec(hostname);
    // return match ? match[0] : 'localhost';
    // await axios.get('https://api.ipify.org?format=json').then((res)=>{
    //     const ip = res.data.ip;
    //     return ip;
    // }).catch((e)=>{
    //     return "Un Known";
    // });
    return axios.get('https://api.ipify.org?format=json');
};
