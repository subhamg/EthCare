var Bhagwaan = artifacts.require("Bhagwaan");
var Patientgen = artifacts.require("PatientGen");
var DoctorGen = artifacts.require("DoctorGen");

module.exports = function(deployer) {
  var bhagAdd;
  deployer.deploy(Bhagwaan).then(function(){
    // bhagAdd = Bhagwaan.address;
    return deployer.deploy(Patientgen, Bhagwaan.address)
  }).then(function(){
    return deployer.deploy(DoctorGen, Bhagwaan.address)
  });
};
