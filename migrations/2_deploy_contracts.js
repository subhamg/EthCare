var Bhagwaan = artifacts.require("Bhagwaan");
var Patient = artifacts.require("Patient");
var Doctor = artifacts.require("Doctor");

module.exports = function(deployer) {
  deployer.deploy(Bhagwaan).then(function(){
    return deployer.deploy(Patient, Bhagwaan.address)
  });
  deployer.deploy(Doctor);
};
