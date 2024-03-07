import utilFuncs from "./utilFuncs.js";

const tests = [

    {
        func: utilFuncs.conv.objToUrl,
        parameter: {userName: "BobTheBuilder", password:"IHATEBUILDING"},
        expected: "userName=BobTheBuilder&password=IHATEBUILDING"
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
            `Test failed for function: ${tests[i].func.name}\n
            got: ${result}\n
            expected: ${tests[i].expected}`
            );

    }

}