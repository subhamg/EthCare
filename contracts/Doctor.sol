pragma solidity 0.5.3;
import "./Bhagwaan.sol";
import "./Patientgen.sol";


// contract AbstractPatient{
//     function pushHash(bytes32) public;
// }

contract DoctorGen{
  address[] contracts;
  address bhagw;
  address govt;
  address[] contractUsers;

  constructor(address bhagwaanadd) public payable{
    govt=msg.sender;
    bhagw = bhagwaanadd;
  }

  function getDoctorCount() public view returns(uint doccount){
    return contracts.length;
  }

  function newDoctor(address docAcc, bytes32 pubKey) public returns (address newContract){
    require(msg.sender == govt);
    bool userFound = false;
    for (uint i=0; i<contractUsers.length; i++) {
          if (docAcc == contractUsers[i]){
              userFound = true;
          }
    }
    if (!userFound) {
      Doctor d = new Doctor(docAcc);
      Bhagwaan bh = Bhagwaan(bhagw);
      bh.addDoc(address(d), pubKey);
      contracts.push(address(d));
      contractUsers.push(docAcc);
      return address(d);
    }
    else return address(0);
  }

  function getLastAddress() public view returns(address latestContract){
    return contracts[contracts.length-1];
  }
}

contract Doctor {
    //Address of the school administrator
    address user;
    mapping(address => bool) isPatient;
    mapping(address => bytes32) patientKeys;
    address[] myPatients;

    constructor(address docAcc) public payable{
        user=docAcc;
    }

    function kill() public{
        require(msg.sender == user);
            selfdestruct(msg.sender);
    }

    function commitprescription(address pat, bytes32 hashvalue) public{
        // Patient.pushhash()///call push hash function uswing given address
        require(msg.sender==user, "Only doctor can commit");
        require(isPatient[pat], "Not your patient asshole");
        Patient my_a = Patient(pat);
        my_a.pushHash(hashvalue);
    }

    function addPatient(address patient, bytes32 encryptedKey) public{
        require(!isPatient[patient], "patient already added.");
        myPatients.push(patient);
        isPatient[patient] = true;
        patientKeys[patient] = encryptedKey;
    }

    function removePatient(address patient) public {
        require(msg.sender == patient, "Only patient can remove him/her self.");
        isPatient[patient] = false;
    }

    function updatePatientKey(address patient, bytes32 keyValue) public{
        require(msg.sender == patient, "Only patient can update key value in doc.");
        require(isPatient[patient], "patient does not exists.");
        patientKeys[patient] = keyValue;
    }

    function getAllowedPatientsNum() public view returns(uint){
        return myPatients.length;
    }

    function getAllowedPatientByIndex(uint i) public view returns (address){
        require(isPatient[myPatients[i]], "Patient no longer accessible.");
        return myPatients[i];
    }

    function getPatientKey(address patAddress) public returns(bytes32){
        return patientKeys[patAddress];
    }
}
