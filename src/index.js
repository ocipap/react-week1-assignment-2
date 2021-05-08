/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function render({ viewNumber, operator, resultNumber }) {
  const setViewNumber = (i) => {
    render({
      viewNumber: parseInt(String(viewNumber) + String(i), 10),
      operator,
      resultNumber,
    });
  };

  const setOperator = (oper) => {
    render({
      viewNumber: 0,
      operator: oper,
      resultNumber
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        { viewNumber || resultNumber }
      </p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button
              type="button"
              onClick={() => setViewNumber(i)}
            >
              {i}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((oper) => (
            <button
              type="button"
              onClick={() => setOperator(oper)}
            >
              {oper}
            </button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  viewNumber: 0,
  operator: '',
  resultNumber: 0,
});
