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
    "type": "constructor"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
    "type": "constructor"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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


     // Akash: Ajax event to server for executing script addPatient.sh
    $.ajax({
        data: {patientName: patientAddress, password: patientAddress},
        url: './addPatient.php',
        method: 'POST',
        success: function(msg) {
            alert('Added to database!');

            if(patientAddress) {
              window.location.href = "patient.html";
            }
        }
    });



}

function showPatientAddress() {
  document.getElementById('patientAddress').innerHTML = patientAddress;
  console.log(patientAddress);
  document.getElementById('contractAddress').innerHTML = contractAddress;
}

function showDoctorAddress() {
  document.getElementById('doctorAddress').innerHTML = doctorAddress;
  console.log(patientAddress);
  document.getElementById('docContractAddress').innerHTML = docContractAddress;
}

//
function loginDoctor() {
    doctorAddress = document.getElementById("doctor-address").value;
    docContractAddress = document.getElementById("docContractAddress").value;
    localStorage.setItem("someVarKey", doctorAddress);
    localStorage.setItem("someVarKey2", docContractAddress);
    if(doctorAddress) {
    //   document.getElementById("home").style.display = none;
      window.location.href = "doctor.html";
    //   document.getElementById('patient').style.dilsplay = block;
    }
}

function registerDoctor() {
  doctorAddress = document.getElementById("new-doctor-address").value;
  var  transactAddress = document.getElementById("transact-address").value;
  var dKey = document.getElementById("dKey").value;
  console.log(transactAddress);
  console.log(doctorAddress);
  console.log(dKey);
  doctorGen.newDoctor(doctorAddress, dKey, {from: transactAddress, gas:3000000});
  docContractAddress = doctorGen.getLastAddress();
  localStorage.setItem("someVarKey", doctorAddress);
  localStorage.setItem("someVarKey2", docContractAddress);



  // Akash: Ajax event to server for executing script addDoctor.sh
  $.ajax({
      data: {doctorName: doctorAddress, password: doctorAddress},
      url: './addDoctor.php',
      method: 'POST',
      success: function(msg) {
          alert('Added to database!');
          if(newDoctorAddress && transactAddress && dKey) {
            window.location.href = "doctor.html";
          }
      }
  });

  
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



var numOfElements = doctor.getAllowedPatientsNum();
for (let i = 0; i < numOfElements; i++) {
  var elem = doctor.getAllowedPatientByIndex(i);
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
  var doc1Address = document.getElementById("gadoctor-address").value;
  var key = document.getElementById("key").value;
  console.log('maa kichut');
  console.log(patientAddress);
  console.log(doc1Address);
  console.log(key);
  patient.giveAccess(doc1Address,key,{from:patientAddress, gas:3000000});
}

function revokeAddress(){
  var docAddress = document.getElementById("revokeAddress").value;
  console.log('revokedone');
  console.log(patientAddress);
  console.log(docAddress);
  patient.revokeAccess(docAddress,{from:patientAddress, gas:3000000});
}


var numOfElements = patient.getAllowedDocsNum();
console.log('allowed docs - '+numOfElements);
for (let i = 0; i < numOfElements; i++) {
  var elem = patient.getAllowedDocByIndex(i);
  console.log('found this');
  console.log(elem);
  console.log('khatam bc');
  document.getElementById("vdoctor-address").innerHTML = elem;
}
