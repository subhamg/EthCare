// Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:6545"));
}

web3.eth.defaultAccount = web3.eth.accounts[2];
var doctorContract = web3.eth.contract([
  {
    "inputs": [],
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
        "name": "pat",
        "type": "address"
      },
      {
        "name": "hashvalue",
        "type": "bytes32"
      }
    ],
    "name": "commitprescription",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "patient",
        "type": "address"
      }
    ],
    "name": "addPatient",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getPatientsNum",
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
    "name": "getPatientByIndex",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);
var doctor = doctorContract.at(doctorAddress);
console.log(doctor);

//



var numOfElements = doctor.getPatientsNum.call();
for (let i = 0; i < numOfElements; i++) {
  var elem = doctor.getPatientsNum(i);
  document.getElementById("patient-address").innerHTML = elem;

}
