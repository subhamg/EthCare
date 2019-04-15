pragma solidity 0.5.3;
import "./Bhagwaan.sol";


// contract AbstractBhagwaan{
//     function checkDoc(address) public returns(bool);
// }

contract PatientGen {
  address[] contracts;
  address bhagw;
  address user;

  constructor(address bhagwaanAddrs) public payable{
    user=msg.sender;
    bhagw=bhagwaanAddrs;
  }

  function getPatientCount() public returns(uint patientcount){
    return contracts.length;
  }

  function newPatient() public returns (address newContract){
    Patient p = new Patient(bhagw);
    contracts.push(address(p));
    return address(p);
  }

  function getLastAddress() public returns(address latestContract){
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
    mapping(address => bytes32) encryptedKeys;//corresponding encrypted symmetric key for doctors
    address bhag;


    constructor(address bhagwaanAddrs) public payable{
        user=tx.origin;
        bhag=bhagwaanAddrs;
    }

    function kill() public{
        require(msg.sender == user);
            selfdestruct(msg.sender);
    }


    function giveAccess(address doc, bytes32 encryptedKey) public {
        require(msg.sender==user);
        Bhagwaan a = Bhagwaan(bhag);
        require(a.checkDoc(doc));
        isAllowed[doc] = true;
        encryptedKeys[doc] = encryptedKey;
        allowed.push(doc);
    }

    function revokeAccess(address doc) public {
        require(msg.sender==user);
        isAllowed[doc] = false;
        encryptedKeys[doc] = 0;
    }

    // function getAllowedDocs() public returns (address[] allowedDocs){
    //   return allowed;
    // }

    // function updateKey(bytes32 newKey) private{
    //
    // }

    function checkAllowed(address doc) public returns(bool){
        return isAllowed[doc] ;
    }

    function pushHash(bytes32 hashvalue)public{
        address doc = msg.sender;
        require(checkAllowed(doc));
        prescription.push(hashvalue);
    }

    function getNumPrescriptions() public returns(uint){
        return prescription.length;
    }

    // function getRecords(address patient) public return(string){
    //
    // }

}
