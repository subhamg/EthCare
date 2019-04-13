pragma solidity >=0.5.1;

contract Bhagwaan{
    mapping(address => bytes32) pubKeyDoctor;
    mapping(address => bool) isDoctor; 
    address[] public Doctors;

    // Requires a public getter for array size
    function size() public returns (uint) {
        return Doctors.length;
    }
    
    function checkDoc(address doc) public returns(bool){
        return isDoctor[doc];
    }
    
    function addDoc(address doc) public {
        isDoctor[doc] = true;
    }
    
    function getPubKey(address doc) public returns(bytes32){
        return pubKeyDoctor[doc];
    }
    
}