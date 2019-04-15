var Bhagwaan = artifacts.require("Bhagwaan");
var Patientgen = artifacts.require("PatientGen");
var Doctor = artifacts.require("Doctor");

module.exports = function(deployer) {
  deployer.deploy(Bhagwaan).then(function(){
    return deployer.deploy(Patientgen, Bhagwaan.address)
  });
  deployer.deploy(Doctor, {from: "0x774f20f50dc86174f0419b63cca6498cd4e8dea4"});
};
