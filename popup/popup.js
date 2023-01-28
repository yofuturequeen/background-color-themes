// This is the function that will send our message to the content script.
// It is asyncronous because we want to use the "await" keyword inside it,
// which lets us wait for something to complete. In this case we wait for
// a response from the content script.
async function sendMessageToContentScript(message) {
  // This code came from the Chrome extension documentation. It just gets
  // the currently active tab on the last focused window to ensure that we
  // send the message to the right place.
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // We use the "await" keyword to wait for a response from the content
  // script. If you don't need a response, you can just run
  // "chrome.tabs.sendMessage(tab.id, message)" and omit the "const response = await"
  chrome.tabs.sendMessage(tab.id, message);

  // You can do something with response from the content script here,
  // if you chose to wait for it.
}

let colorInput = document.getElementById("color-input1");

var checkInput1 = document.querySelector("input[id=check1]");
var checkInput2 = document.querySelector("input[id=check2]");
var checkInput3 = document.querySelector("input[id=check3]");



//const checkInput = document.getElementById("check1")
//console.log(checkInput)

// if check2 == true: colorInput = document.getElementById("color-input2")
// elif check3 == true: colorInput = document.getElementById("color-input2")
// else const colorInput = document.getElementById("color-input");

const saveColorAndSendMessage = (e) => {
  console.log(colorInput.value);
  let selectedColor = colorInput.value;
  chrome.storage.sync.set({color: selectedColor});
  // colorInput.value is whatever the value of colorInput is when this code runs
  sendMessageToContentScript({ color: selectedColor });
};

checkInput1.addEventListener("change", saveColorAndSendMessage);
// Add an event listener to the message button that will send a message
// to the content script when the button is clicked.
// let colorInput = document.getElementById("color-input1");
chrome.storage.sync.get(["color"], (result) => {
  console.log(result);
  colorInput.value = result.color;
});




let colorInput2 = document.getElementById('color-input2')

const sendMessage = (e) => {
  let selectedColor = colorInput2.value;
  chrome.storage.sync.set({color: selectedColor});
  sendMessageToContentScript({ color: colorInput2.value});
};

checkInput2.addEventListener("change", sendMessage);

// Tried to make a function that would allow me to change the variable colorInput depending on which
// checkbox was checked. Doesn't really work

/*
checkInput2.addEventListener("change", () => {
  changeColorInput2();
  saveColorAndSendMessage();
  chrome.storage.sync.get(["color"], (result) => {
    console.log(result);
    colorInput.value = result.color;
        });
});

// Add an event listener to the message button that will send a message
// to the content script when the button is clicked.
// let colorInput = document.getElementsByName("color-input2");

const changeColorInput2 = colorInput => {
  let colorInput = document.getElementById("color-input2");
  console.log('check 2 works')
  console.log(colorInput.value)
  return colorInput;
}
*/