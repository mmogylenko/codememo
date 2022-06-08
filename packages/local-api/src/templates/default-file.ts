export default () => {
  return `/* text-arshd */
  /*
  # CodeMemo
  
  This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.
  
  - Click any text cell (**including this one**) to edit
  - The code in each Code Editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!
  - You can show any React components, strings, numbers, or anything else by calling the built-in \`show\` function. Call show multiple times to show multiple values
  - Re-order or delete cells using the buttons on the top right
  - Add new cells by hovering on the divider between each cell
   
  All of your changes get saved to the file you opened CodeMemo with. So if you ran \`npx codememo serve demo.js\`, all of the text and code you write will be saved to the \`demo.js\` file.
  */
  /* code-jp2d9 */
  import { useState } from 'react';
  
  const Counter = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Click</button>
        <h3>Count: {count}</h3>
      </div>
    );
  };
  
  // Display any variable or React Component by calling 'show'
  show(<Counter />);
  /* code-xsjct */
  import React from 'react';
  
  const App = () => {
    return (
      <div>
        <h3>App Says Hi!</h3>
        <i>Counter component will be rendered below...</i>
        <hr />
        {/* 
          Counter was declared in an earlier cell - 
          we can reference it here! 
        */}
        <Counter />
      </div>
    );
  };
  
  show(<App />);`;
};
