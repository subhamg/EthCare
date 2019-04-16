// Web3 = require('web3');
//if (typeof web3 !== 'undefined') {
//  web3 = new Web3(web3.currentProvider);
//} else {
  // set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:6545"));
//}

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

var patientGen = patientGenContract.at('0xf72B21Aa33B3e5925074880A81Ef0DCBA8216E3b');
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
          "type": "string"
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

var doctorGen = doctorGenContract.at('0xeE42e406947a892B3620569e062FB72952Ec986c');
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
          if(doctorAddress && transactAddress && dKey) {
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
          "type": "string"
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
          "type": "string"
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
      "constant": true,
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
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
var doctor = doctorContract.at(docContractAddress);//change to contract address
console.log("doctor contract");
console.log(doctor);

//

function givePresciption()
{
  var data = document.getElementById("prescription").value;
  var patientId = document.getElementById("patientId").value;
  // alert(data);
  // alert(patientId);
  alert(docContractAddress);
  encryptedKey = doctor.getPatientKey(patientId);
  var pubKey = read("pubkey.pub");
  alert(pubKey);


  var myString   = "https://www.titanesmedellin.com/";
  var myPassword = "myPassword";
  var encrypt = new JSEncrypt();
  // var pubkey = document.getElementById("prescription").value();
  pubKey = "-----BEGIN PUBLIC KEY-----\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\
gwQco1KRMDSmXSMkDwIDAQAB\
-----END PUBLIC KEY-----";
  var encrypted = encrypt.encrypt(myString);
  // PROCESS
  // var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
  // var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
  alert(myString);
  alert(encrypted);
  // alert(decrypted.toString(CryptoJS.enc.Utf8));
  // document.getElementById("demo0").innerHTML = myString;
  // document.getElementById("demo1").innerHTML = encrypted;
  // document.getElementById("demo2").innerHTML = decrypted;
  // document.getElementById("demo3").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
}



var numOfElements = doctor.getAllowedPatientsNum();
for (let i = 0; i < numOfElements; i++) {
  var elem = doctor.getAllowedPatientByIndex(i);
  document.getElementById("patAddresses").innerHTML += '<li class="list-group-item" ><button class="btn btn-default prescription-btn" data-toggle1="tooltip" title="Give Prescription" data-toggle="modal" data-target="#myModal"> <span class="glyphicon glyphicon-pencil"></span></button>' +elem +'</li>';

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
          "type": "string"
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
          "type": "string"
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
          "type": "string"
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



  // Akash: Ajax event to server for executing script addPatient.sh

  $.ajax({
      data: {patientName: patientAddress, doctorName: doc1Address},
      url: './giveDoctorAccessToPatient.php',
      method: 'POST',
      success: function(msg) {
          alert('Access given in database!');
      }
  });


}

function revokeAddress(){
  var docAddress = document.getElementById("revokeAddress").value;
  console.log('revokedone');
  console.log(patientAddress);
  console.log(docAddress);
  patient.revokeAccess(docAddress,{from:patientAddress, gas:3000000});

  // Akash: Ajax event to server for executing script addPatient.sh
    $.ajax({
        data: {patientName: patientAddress, doctorName: docAddress},
        url: './revokeDoctorAccessFromPatient.php',
        method: 'POST',
        success: function(msg) {
            alert('Revoked from database!');
        }
    });
}


var numOfElements = patient.getAllowedDocsNum();
console.log('allowed docs - '+numOfElements);
for (let i = 0; i < numOfElements; i++) {
  var elem = patient.getAllowedDocByIndex(i);
  console.log('found this');
  console.log(elem);
  console.log('khatam bc');
  document.getElementById("docAddresses").innerHTML += '<li class="list-group-item" >' +elem +'</li>';
}
