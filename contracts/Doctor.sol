pragma solidity 0.5.3;
import "./Bhagwaan.sol";
import "./Patientgen.sol";


// contract AbstractPatient{
//     function pushHash(bytes32) public;
// }

contract Doctor {
    //Address of the school administrator
    address user;
    mapping(address => bool) isPatient;
    mapping(address => bytes32) patientKeys;
    address[] myPatients;

    constructor() public payable{
        user=msg.sender;
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
}
