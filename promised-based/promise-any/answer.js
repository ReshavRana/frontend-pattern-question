const sastaPromiseAny = (promisesArray, timeOutLimit = null) => {
  return new Promise((resolve, reject) => {
    if (timeOutLimit) {
    //   console.log("Reshav here?");
      const timeoutPromise = new Promise((resolve, _) => {
        setTimeout(() => {
        //   console.log("Reshav here? 2");
          reject("Timeout");
        }, timeOutLimit);
      });
      promisesArray.push(timeoutPromise);
    }

    let numberOfRejectedPromises = 0;
    let rejectedArrayResults = [];
    promisesArray.forEach((inputElement, index) => {
      const promiseElement = Promise.resolve(inputElement);
      promiseElement
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          numberOfRejectedPromises++;

          rejectedArrayResults[index] = error;

          if (numberOfRejectedPromises === promisesArray.length)
            reject(rejectedArrayResults);
        });
    });
  });
};





// testing the implementation
function testPromiseAny(PromiseAny) {
//   console.log("reh");
  const testCases = [
    {
      input: [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      expected: 1,
    },
    {
      input: [
        Promise.reject("error1"),
        Promise.reject("error2"),
        Promise.reject("error3"),
      ],
      expected: ["error1", "error2", "error3"],
      isError: true,
    },
    {
      input: [Promise.reject("error1"), Promise.resolve(2)],
      expected: 2,
    },
    {
      input: [],
      expected: "All promises rejected",
      isError: true,
    },
    {
        input: [
          new Promise((resolve) => setTimeout(resolve, 10000, 'slow 1')),
          new Promise((resolve) => setTimeout(resolve, 2000, 'slow 2')),
          Promise.reject('fast error'),
          Promise.reject('another error'),
        ],
        expected: 'slow 2',
      },

    {
      input: [
        new Promise((resolve) => setTimeout(resolve, 2000, "slow 1")),
        new Promise((resolve) => setTimeout(resolve, 3000, "slow 2")),
      ],
      timeout: 1500,
      expected: "Timeout",
      isError: true,
    },
  ];

  testCases.forEach(({ input, expected, isError, timeout = null }) => {
    PromiseAny(input, timeout)
      .then((result) => {
        // console.log("Reshav reult", { result, expected });
        if (isError) {
          throw new Error("Expected rejection, but resolved");
        }

        console.assert(
          result === expected,
          `Expected: ${expected}, Got: ${result}`
        );
      })
      .catch((error) => {
        if (!isError) {
          throw new Error("Expected resolution, but rejected");
        }
        // console.log("Reshav error", { error, expected });
        console.assert(
          JSON.stringify(error) === JSON.stringify(expected),
          `Expected error: ${JSON.stringify(expected)}, Got: ${error}`
        );
      });
  });
}

testPromiseAny(sastaPromiseAny);
