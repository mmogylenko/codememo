import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showFunctionNoop = 'var show = () => {}';
    const showFunction = `
        import * as _React from 'react';
        import _ReactDOM from 'react-dom/client';

        var show = (value) => {
            const root = document.querySelector('#root');
            if (typeof value === 'object') {
              if('$$typeof' in value && 'props' in value) {
                _ReactDOM.createRoot(root)
                .render(value);
              } else {
                root.innerHTML = JSON.stringify(value, null, 2);
              }
            } else {
              root.innerHTML = value;
            }
        };
        `;
    const cumulativeCode: string[] = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoop);
        }
        cumulativeCode.push(c.content);
      }

      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode.join('\n');
  });
};
