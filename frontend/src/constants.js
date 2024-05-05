export const codeBlocks = [
    {
      id: '1',
      title: 'Async case',
      code: `function asyncFunction() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Async operation completed');
            }, 2000);
        });
    }
    
    async function main() {
        console.log('Start of async operation');
        try {
            const result = await asyncFunction();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('End of async operation');
    }
    
    main();`,
    },
    {
      id: '2',
      title: 'Conditional statement',
      code: `x = 10

      if x > 0:
          print("Positive number")
      elif x < 0:
          print("Negative number")
      else:
          print("Zero")`,
    },
    {
      id: '3',
      title: 'Looping construct',
      code: `const numbers = [1, 2, 3, 4, 5];

      for (let i = 0; i < numbers.length; i++) {
          console.log("Number:", numbers[i]);
      }`,
    },
    {
      id: '4',
      title: 'Data structure manipulation',
      code: `let fruits = ['apple', 'banana', 'orange'];

      // Add a new fruit to the array
      fruits.push('grape');
      
      // Remove a fruit from the array
      fruits = fruits.filter(fruit => fruit !== 'banana');
      
      // Print the modified array
      console.log(fruits);
      `,
    },
  ]