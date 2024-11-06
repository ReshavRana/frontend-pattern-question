
const sastaPromiseAll = (promisesArray)=>{
  

   return new Promise((resolve,reject)=>{
    
    let results = Array(promisesArray?.length);
    let resolvedPromisesCount = 0;

    promisesArray.forEach((_localPromise,index) => {

        const localPromise = Promise.resolve(_localPromise);

        localPromise.then((resolvedValue)=>{
            results[index] = resolvedValue
            resolvedPromisesCount++;
            // console.log("reshav2 resolvedValue",{resolvedValue})

            if(resolvedPromisesCount === promisesArray.length)
            resolve(results)
        })
        .catch((rejectedError)=>{
            // console.log("reshav2 rejected",{rejectedError})
           reject(rejectedError)
        })
    });


   })
}

Promise.sastaPromiseAll = sastaPromiseAll;



function testPromiseAll() {
    const testCases = [
      {
        input: [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
        expected: [1, 2, 3],
      },
      {
        input: [Promise.resolve(1), Promise.reject('error'), Promise.resolve(3)],
        expected: 'error',
        isError: true,
      },
      {
        input: [Promise.resolve(1), 2, 3],
        expected: [1, 2, 3],
      },
      {
        input: [],
        expected: [],
      },
    ];
  
    testCases.forEach(({ input, expected, isError }) => {
        Promise.sastaPromiseAll(input)
        .then((result) => {
            
          if (isError) {
            throw new Error('Expected rejection, but resolved');
          }
          console.assert(
            JSON.stringify(result) === JSON.stringify(expected),
            `Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(result)}`
          );
        })
        .catch((error) => {
          if (!isError) {
            throw new Error('Expected resolution, but rejected');
          }

          console.assert(error === expected, `Expected error: ${expected}, Got: ${error}`);
        });
    });
  }
  
  testPromiseAll();