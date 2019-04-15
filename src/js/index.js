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

// var successAlert = document.getElementById("myAlert");
var vOneLocalStorage;
//Capture patient address and redirect to patient page.
function loginPatient() {
    var patientAddress = document.getElementById("patient-address").value;
    localStorage.setItem("vOneLocalStorage", patientAddress)
    if(patientAddress) {
        window.location.href = "patient.html";
    }

    // document.getElementById("patientName").innerHTML = g[0];
}

//Create new contact list and redirect to patient page.
function registerPatient() {
    var newPatientAddress = document.getElementById("new-patient-address").value;
    // document.getElementById("demo").innerHTML = newPatientAddress;
    // patientGen.newPatient(function(error,result){
    //   if(!error){
    //     console.log(result);
    //   }
    //   else{
    //     console.error(error);
    //   }
    // });
    var tid = patientGen.newPatient({from: web3.eth.accounts[2], gas:3000000});
    var receipt = web3.eth.getTransactionReceipt(tid);
    console.log(receipt);
    if(newPatientAddress) {
        window.location.href = "patient.html";
    }
}

//
function loginDoctor() {
    var doctorAddress = document.getElementById("doctor-address").value;
    document.getElementById("demo").innerHTML = doctorAddress;
    if(doctorAddress) {
        window.location.href = "doctor.html";
    }
}
