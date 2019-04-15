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
    "constant": true,
    "inputs": [],
    "name": "getPatientCount",
    "outputs": [
      {
        "name": "patientcount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
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
    "constant": true,
    "inputs": [],
    "name": "getLastAddress",
    "outputs": [
      {
        "name": "latestContract",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x71a2ee52"
  }
]);

var patientGen = patientGenContract.at('0x1132EBd5E9DA195F58fB56623f6C38E6A76de8ef');
console.log('patientGen');
console.log(patientGen);

var doctorGenContract = web3.eth.contract([
  {
    "inputs": [
      {
        "name": "bhagwaanadd",
        "type": "address"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getDoctorCount",
    "outputs": [
      {
        "name": "doccount",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x79111c1c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "docAcc",
        "type": "address"
      },
      {
        "name": "pubKey",
        "type": "bytes32"
      }
    ],
    "name": "newDoctor",
    "outputs": [
      {
        "name": "newContract",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc13cbc08"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getLastAddress",
    "outputs": [
      {
        "name": "latestContract",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x71a2ee52"
  }
]);

var doctorGen = doctorGenContract.at('0xe2B93D3f84a9b156336AE558E5A4de7Ce345Ed91');
console.log("doctorGen contract");
console.log(doctorGen);


var patientAddress;
var doctorAddress;
var contractAddress;
var docContractAddress;

// var successAlert = document.getElementById("myAlert");

//Capture patient address and redirect to patient page.
function loginPatient() {
    patientAddress = document.getElementById("patient-address").value;
    contractAddress = document.getElementById("contract-address").value;
    localStorage.setItem("someVarKey", patientAddress);
    localStorage.setItem("someVarKey2", contractAddress);
    console.log('addresses');
    console.log(patientAddress);
    console.log(contractAddress);
    if(patientAddress) {
      window.location.href = "patient.html";
    }
    // x = document.getElementById("home");
    // y = document.getElementById('patient')
    // if(x.style.display === 'display') {
    //   x.style.display = 'none';
    // } else if(y.style.display === 'none') {
    //   y.style.display = 'display';
    // };

    }

    // document.getElementById("patientName").innerHTML = g[0];


//Create new contact list and redirect to patient page.
function registerPatient() {
    patientAddress = document.getElementById("new-patient-address").value;
    console.log("address pat -"+patientAddress);
    localStorage.setItem("someVarKey", patientAddress);
    patientGen.newPatient({from: String(patientAddress), gas:3000000});
    contractAddress = patientGen.getLastAddress();
    localStorage.setItem("someVarKey2", contractAddress);
    if(patientAddress) {
        window.location.href = "patient.html";
    }
}

function showPatientAddress() {
  document.getElementById('patientAddress').innerHTML = patientAddress;
  console.log(patientAddress);
  document.getElementById('contractAddress').innerHTML = contractAddress;
}

//
function loginDoctor() {
    doctorAddress = document.getElementById("doctor-address").value;
    docContractAddress = document.getElementById("docContractAddress").value;
    document.getElementById("demo").innerHTML = doctorAddress;
    if(doctorAddress) {
      document.getElementById("home").style.display = none;
      document.getElementById('patient').style.dilsplay = block;
    }
}

function registerDoctor() {
  doctorAddress = document.getElementById("new-doctor-address").value;
  var  transactAddress = document.getElementById("transact-address").value;
  var dKey = document.getElementById("dKey").value;
  doctorGen.newDoctor(newDoctorAddress, dKey, {from: transactAddress, gas:3000000});
  docContractAddress = doctorGen.getLastAddress();
  if(newDoctorAddress && transactAddress && dKey) {
      window.location.href = "doctor.html";
  }
}


///////////////////////////////////////////////////////////////////////////////////////////
var doctorContract = web3.eth.contract([
  {
    "inputs": [
      {
        "name": "docAcc",
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
      },
      {
        "name": "encryptedKey",
        "type": "bytes32"
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
    "inputs": [
      {
        "name": "patient",
        "type": "address"
      }
    ],
    "name": "removePatient",
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
      },
      {
        "name": "keyValue",
        "type": "bytes32"
      }
    ],
    "name": "updatePatientKey",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllowedPatientsNum",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "i",
        "type": "uint256"
      }
    ],
    "name": "getAllowedPatientByIndex",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "patAddress",
        "type": "address"
      }
    ],
    "name": "getPatientKey",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);
var doctor = doctorContract.at(docContractAddress);//change to contract address
console.log("doctor contract");
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
    "name": "updateKey",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllowedDocsNum",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
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
    "stateMutability": "view",
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
    "constant": true,
    "inputs": [],
    "name": "getNumPrescriptions",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "doc",
        "type": "address"
      }
    ],
    "name": "getPubKey",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);
var patient = patientContract.at(contractAddress);//change to contract address
console.log("patient contract");
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
