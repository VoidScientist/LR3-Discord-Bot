import utilFuncs from "./utilFuncs.js";

const tests = [

    {
        func: utilFuncs.conv.objToUrl,
        parameter: {userName: "BobTheBuilder", password:"IHATEBUILDING"},
        expected: "userName=BobTheBuilder&password=IHATEBUILDING"
    },

    {
        func: utilFuncs.conv.objToUrl,
        parameter: {userName:"Mickey Mouse", password:"Minnie is mid"},
        expected: "userName=Mickey%20Mouse&password=Minnie%20is%20mid"
    },

    {
        func: utilFuncs.conv.objToUrl,
        parameter: {"user Name":"Mickey Mouse", "password":"Minnie is mid"},
        expected: "user%20Name=Mickey%20Mouse&password=Minnie%20is%20mid"
    },

    {
        func: utilFuncs.conv.strToUrl,
        parameter: "BE NOT AFRAID",
        expected: "BE%20NOT%20AFRAID"
    }

]

for (let i = 0; i < tests.length; i++) {

    let result = tests[i].func(tests[i].parameter);

    if (result !== tests[i].expected) {

        throw new Error(
            `Test ${i+1} failed for function: ${tests[i].func.name}\n
            got: ${result}\n
            expected: ${tests[i].expected}`
            );

    }

    console.log(`Test ${i+1} involving ${tests[i].func.name} passed.`);

}