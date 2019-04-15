// Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:6545"));
}

web3.eth.defaultAccount = web3.eth.accounts[2];
var patientContract = web3.eth.contract([
  {
    "inputs": [
      {
        "name": "bhagwaanAddrs",
        "type": "address"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "doc",
        "type": "address"
      },
      {
        "name": "encryptedKey",
        "type": "bytes32"
      }
    ],
    "name": "giveAccess",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "doc",
        "type": "address"
      }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getAllowedDocsNum",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "i",
        "type": "uint256"
      }
    ],
    "name": "getAllowedDocByIndex",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "doc",
        "type": "address"
      }
    ],
    "name": "checkAllowed",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "hashvalue",
        "type": "bytes32"
      }
    ],
    "name": "pushHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getNumPrescriptions",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);
var patient = patientContract.at(patientAddress);
console.log(patient);

//

function giveAcess(){
  var docAddress = document.getElementById("doctor-address").value;
  var key = document.getElementById("key").value;
  Patient.giveAccess(docAddress,key);
}

function revokeAddress(){
  var docAddress = document.getElementById("revokeAddress").value;
  Patient.revokeAccess(docAddress);
}


var numOfElements = patient.getAllowedDocsNum.call();
for (let i = 0; i < numOfElements; i++) {
  var elem = Patient.getAllowedDocByIndex(i);
  document.getElementById("doctor-address").innerHTML = elem;
}

var vOneLS = localStorage.getItem("vOneLocalStorage ");  

var variableTwo = vOneLS; 

console.log(variableTwo);