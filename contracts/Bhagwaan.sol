pragma solidity 0.5.3;

contract Bhagwaan{

    address govt;
    mapping(address => bytes32) pubKeyDoctor;
    mapping(address => bool) isDoctor;
    // address[] public Doctors;

    constructor() public {
        govt = msg.sender;
    }
    // Requires a public getter for array size
    // function size() public returns (uint) {
    //     return Doctors.length;
    // }

    function checkDoc(address doc) public view returns(bool){
        return isDoctor[doc];
    }

    function addDoc(address doc, bytes32 pubKey) public {
        // require(tx.origin==govt);
        isDoctor[doc] = true;
        setPubKey(doc, pubKey);
    }

    function getPubKey(address doc) public view returns(bytes32){
        require(checkDoc(doc));
        return pubKeyDoctor[doc];
    }

    function setPubKey(address doc, bytes32 docPub) private{
        // require(msg.sender==govt);
        require(checkDoc(doc));
        pubKeyDoctor[doc] = docPub;
    }

}
