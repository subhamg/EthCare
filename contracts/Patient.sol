pragma solidity 0.5.3;
import "./Bhagwaan.sol";
import "./Doctor.sol";


contract AbstractBhagwaan{
    function checkDoc(address) public returns(bool);
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
        user=msg.sender;
        bhag=bhagwaanAddrs;
    }

    function kill() public{
        require(msg.sender == user);
            selfdestruct(msg.sender);
    }


    function giveAccess(address doc, bytes32 encryptedKey) public {
        require(msg.sender==user);
        AbstractBhagwaan a = AbstractBhagwaan(bhag);
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

    // function getRecords(address patient) public return(string){
    //
    // }

}
