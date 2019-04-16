pragma solidity 0.5.3;
import "./Bhagwaan.sol";


// contract AbstractBhagwaan{
//     function checkDoc(address) public returns(bool);
// }

contract AbstractDoctor {
    function addPatient(address, string memory) public;
    function updatePatientKey(address, string memory) public;
    function removePatient(address) public;
}

contract PatientGen {
    address[] contracts;
    address bhagw;
    address user;
    address[] contractUsers;

    constructor(address bhagwaanAddrs) public payable{
      user=msg.sender;
      bhagw=bhagwaanAddrs;
    }

    function getPatientCount() public view returns(uint patientcount){
      return contracts.length;
    }

    function newPatient() public returns (address newContract){
      bool userFound = false;
      for (uint i=0; i<contractUsers.length; i++) {
            if (msg.sender == contractUsers[i]){
                userFound = true;
            }
      }
      if (!userFound) {
        Patient p = new Patient(bhagw);
        contracts.push(address(p));
        contractUsers.push(msg.sender);
        return address(p);
      }
      else return address(0);
    }

    function getLastAddress() public view returns(address latestContract){
      return contracts[contracts.length-1];
    }
}

contract Patient {
    //Address of the school administrator
    address user;
    mapping(bytes32 => bool) private isPrescription;
    bytes32[] prescription;
    mapping(address => bool) private isAllowed;
    address[] allowed;
    address bhag;
    Bhagwaan a;


    constructor(address bhagwaanAddrs) public payable{
        user=tx.origin;
        bhag=bhagwaanAddrs;
        a = Bhagwaan(bhag);
    }

    function kill() public{
        require(msg.sender == user);
            selfdestruct(msg.sender);
    }


    function giveAccess(address doc, string memory encryptedKey) public {
        // require(msg.sender==user);
        // Bhagwaan a = Bhagwaan(bhag);
        // require(a.checkDoc(doc));
        isAllowed[doc] = true;
        allowed.push(doc);
        AbstractDoctor doctor = AbstractDoctor(doc);
        doctor.addPatient(address(this), encryptedKey);
    }

    function revokeAccess(address doc) public {
        require(msg.sender==user);
        require(checkAllowed(doc));
        isAllowed[doc] = false;

        AbstractDoctor doctor = AbstractDoctor(doc);
        doctor.removePatient(address(this));
        // encryptedKeys[doc] = 0;
    }

    function updateKey(address doc, string memory encryptedKey) public{
        require(msg.sender == user, "Only patient can do it.");
        require(checkAllowed(doc));
        AbstractDoctor doctor = AbstractDoctor(doc);
        doctor.updatePatientKey(address(this), encryptedKey);
    }

    function getAllowedDocsNum() public view returns(uint){
        return allowed.length;
    }
    function getAllowedDocByIndex(uint i) public view returns (address){
        require(checkAllowed(allowed[i]), "Doctor no longer allowed.");
        return allowed[i];
    }

    function checkAllowed(address doc) public view returns(bool){
        return isAllowed[doc] ;
    }

    function pushHash(bytes32 hashvalue)public{
        address doc = msg.sender;
        require(checkAllowed(doc));
        prescription.push(hashvalue);
    }

    function getNumPrescriptions() public view returns(uint){
        return prescription.length;
    }

    function getPubKey(address doc) public view returns(string memory) {
        // require(a.checkDoc(doc));
        return a.getPubKey(doc);
    }
    // function getRecords(address patient) public return(string memory){
    //
    // }

}
