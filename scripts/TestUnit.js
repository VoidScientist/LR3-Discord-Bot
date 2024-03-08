import UtilFuncs from "./UtilFuncs.js";
import Commands from "./Commands.js";
import { time } from "discord.js";

const tests = [

    {
        func: UtilFuncs.conv.objToUrl,
        parameter: {userName: "BobTheBuilder", password:"IHATEBUILDING"},
        expected: "userName=BobTheBuilder&password=IHATEBUILDING"
    },

    {
        func: UtilFuncs.conv.objToUrl,
        parameter: {userName:"Mickey Mouse", password:"Minnie is mid"},
        expected: "userName=Mickey%20Mouse&password=Minnie%20is%20mid"
    },

    {
        func: UtilFuncs.conv.objToUrl,
        parameter: {"user Name":"Mickey Mouse", "password":"Minnie is mid"},
        expected: "user%20Name=Mickey%20Mouse&password=Minnie%20is%20mid"
    },

    {
        func: UtilFuncs.conv.strToUrl,
        parameter: "BE NOT AFRAID",
        expected: "BE%20NOT%20AFRAID"
    },

    {
        func: UtilFuncs.conv.arrayToUrl,
        parameter: ["Raph","Connait","Pas","Ses","Returns"],
        expected: "Raph%20Connait%20Pas%20Ses%20Returns"
    },

    {
        func: UtilFuncs.conv.arrayToUrl,
        parameter: [],
        expected: ""
    },

    {
        func: UtilFuncs.conv.arrayToUrl,
        parameter: ["Bonjour"],
        expected: "Bonjour"
    },

    {
        func: UtilFuncs.conv.arrayToUrl,
        parameter: [" "],
        expected: "%20"
    },

    {
        func: Commands.cat,
        parameter: ["hello", "world"],
        expected: `https://cataas.com/cat/says/hello%20world?fontColor=white&fontSize=50`
    },

    {
        func: Commands.cat,
        parameter: [],
        expected: `https://cataas.com/cat`
    },

    {
        func: Commands.cat,
        parameter: ["Bonjour"],
        expected: `https://cataas.com/cat/says/Bonjour?fontColor=white&fontSize=50`
    },

    {
        func: Commands.cat,
        parameter: [" "],
        expected: `https://cataas.com/cat/says/%20?fontColor=white&fontSize=50`
    },

    {
        func: Commands.cat,
        parameter: undefined,
        expected: `https://cataas.com/cat`
    },

    {
        func: Commands.cat,
        parameter: null,
        expected: `https://cataas.com/cat`
    },

    {
        func: UtilFuncs.conv.objToUrl,
        checkType: "type",
        parameter: {helloMan: "fuck you"},
        expected: "string"
    },
    

];

const checkingTypes = {

    value: checkResultValue,
    type: checkResultType

};


async function timeExecution(func, parameter) {

    let start = performance.now();

    let result = await func(parameter);

    let end = performance.now();

    return [result, (end-start).toFixed(2)];

}

function checkResultType(result, test, testNum) {

    if (!typeof result == test.expected) {

        throw new Error(
            `Test ${testNum} failed for function: ${test.func.name}\n
            parameters: ${test.parameter}\n
            got: ${typeof result}\n
            expected: ${test.expected}`
            );

    }

}

function checkResultValue(result, test, testNum) {

    if (result !== test.expected) {
    
        throw new Error(
            `Test ${testNum} failed for function: ${test.func.name}\n
            parameters: ${test.parameter}\n
            got: ${result}\n
            expected: ${test.expected}`
            );

    }

}

async function checkTestCases() {

    for (let i = 0; i < tests.length; i++) {

        const checkType = tests[i].hasOwnProperty("checkType") ? tests[i].checkType : "value";

        const [result, duration] = await timeExecution(tests[i].func, tests[i].parameter);
    
        checkingTypes[checkType](result, tests[i], i + 1);
    
        console.log(`[${tests[i].func.name}] Test ${i+1} passed in ${duration} ms.`);
        
    }

}

const [_, testingDuration] = await timeExecution(checkTestCases, null);

console.log(`[TestUnit] All tests cleared in: ${testingDuration} ms.`);