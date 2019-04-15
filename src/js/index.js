// Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:6545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];
var patientGenContract = web3.eth.contract([
  {
    "inputs": [
      {
        "name": "bhagwaanAddrs",
        "type": "address"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getPatientCount",
    "outputs": [
      {
        "name": "patientcount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc190665b"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "newPatient",
    "outputs": [
      {
        "name": "newContract",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe74911da"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getLastAddress",
    "outputs": [
      {
        "name": "latestContract",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x71a2ee52"
  }
]);

var patientGen = patientGenContract.at('0x1132EBd5E9DA195F58fB56623f6C38E6A76de8ef');
console.log(patientGen);
var patientAddress;
var doctorAddress;
var contractAddress;

//Capture patient address and redirect to patient page.
function loginPatient() {
    patientAddress = document.getElementById("patient-address").value;
    //update contract adddress from input
    document.getElementById("demo").innerHTML = patientAddress;
    if(patientAddress) {
        window.location.href = "patient.html";
    }
}

//Create new contact list and redirect to patient page.
function registerPatient() {
    var newPatientAddress = document.getElementById("new-patient-address").value;
    patientGen.newPatient({from: web3.eth.accounts[2], gas:3000000});
    contractAddress = patientGen.getLastAddress();
    if(newPatientAddress) {
        window.location.href = "patient.html";
    }
}

//
function loginDoctor() {
    doctorAddress = document.getElementById("doctor-address").value;
    //update contract address
    document.getElementById("demo").innerHTML = doctorAddress;
    if(doctorAddress) {
        window.location.href = "doctor.html";
    }
}


///////////////////////////////////////////////////////////////////////////////////////////
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
var doctor = doctorContract.at(doctorAddress);//change to contract address
console.log(doctor);

//

function givePresciption()
{

}



var numOfElements = doctor.getPatientsNum;
for (let i = 0; i < numOfElements; i++) {
  var elem = doctor.getPatientsNum(i);
  document.getElementById("patient-address").innerHTML = elem;
}


///////////////////////////////////////////////////////////////////////////////////////////////
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
var patient = patientContract.at(contractAddress);//change to contract address
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


var numOfElements = patient.getAllowedDocsNum;
for (let i = 0; i < numOfElements; i++) {
  var elem = Patient.getAllowedDocByIndex(i);
  document.getElementById("doctor-address").innerHTML = elem;
}
