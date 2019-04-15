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

    function addPatient(address patient) public{
        myPatients.push(patient);
        isPatient[patient] = true;
    }

    function getPatientsNum() public returns(uint){
      return myPatients.length;
    }

    function getPatientByIndex(uint i) public returns (address){
      return myPatients[i];
    }
}
