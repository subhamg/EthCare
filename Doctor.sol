pragma solidity >=0.5.1;
import "./Bhagwaan.sol";
import "./Patient.sol";


contract AbstractPatient{
    function pushHash(bytes32) public; 
}

contract Doctor {
    //Address of the school administrator
    address user;
    mapping(address => bool) isPatient;
    
    
    
    constructor() public payable{
        user=msg.sender;
    }
    
    function kill() public{
        require(msg.sender == user);
            selfdestruct(msg.sender);
    }
    
    function commitprescription(address pat, bytes32 hashvalue) public{ 
        // Patient.pushhash()///call push hash function uswing given address
        AbstractPatient my_a = AbstractPatient(pat);
        my_a.pushHash(hashvalue);
    }
}