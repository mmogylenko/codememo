# CodeMemo

_An interactive coding environment. You can write Javascript, import any NPM modules and see it executed, and write comprehensive documentation using markdown_

*Implemented*

- Edit `Text` cells by clicking on their contents

- The code in each `Code` cell is bundled into one file. Variables defined in any cell can be referenced in others

- It is possible to render React components, strings, numbers, or anything else by calling the built-in `show()` function.

- Re-ordering or deleting cells AppBar on each cell

- Add new cells by hovering on the divider between cells

- All changes are saved to the file you opened *CodeMemo* with. For example, if your start *CodeMemo* with `npx codememo serve demo.js` command, all contents from the text and code cells will be saved to `demo.js` file in the same directory where the command was executed

## Install

```bash
~ npm install [-g] codememo@latest
```

## Usage

```bash
~ npx codememo serve [filename/path-to-file] [--port=<number>]
```

- `--port` by default is set to `8080`
- `--filename` is set to `codememo.js`. Used to store code & text snippets

*Example*

```bash
~ npx codememo serve demo.js
Listening on http://localhost:8080
```

, where *demo.js* is used to store our memos.

![codememo_demo.png](https://github.com/mmogylenko/codememo/blob/main/docs/img/codememo_demo.png)

