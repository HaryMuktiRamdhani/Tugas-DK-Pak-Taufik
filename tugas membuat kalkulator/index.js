// Function to append values to the input
function Solve(val) {
  var v = document.getElementById('res');
  v.value += val;
}

// Function to evaluate the result
function Result() {
  var num1 = document.getElementById('res').value;
  try {
      var num2 = eval(num1.replace('x', '*'));
      document.getElementById('res').value = num2;
  } catch {
      document.getElementById('res').value = 'Error';
  }
}

// Function to clear the input field
function Clear() {
  var inp = document.getElementById('res');
  inp.value = '';
}

// Function to remove the last character from the input field
function Back() {
  var ev = document.getElementById('res');
  ev.value = ev.value.slice(0, -1);
}

// Event listener for keyboard input
document.addEventListener('keydown', function (event) {
  const key = event.key;
  const validKeys = '0123456789+-*/.%x';

  if (validKeys.includes(key)) {
      Solve(key === '*' ? 'x' : key);
  } else if (key === 'Enter') {
      Result();
  } else if (key === 'Backspace') {
      Back();
  } else if (key.toLowerCase() === 'c') {
      Clear();
  }
});