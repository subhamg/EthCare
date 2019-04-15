
//Capture patient address and redirect to patient page.
function loginPatient() {
    var patientAddress = document.getElementById("patient-address").value;
    document.getElementById("demo").innerHTML = patientAddress;

}

//Create new contact list and redirect to patient page. 
function registerPatient() {
    var newPatientAddress = document.getElementById("new-patient-address").value;
    document.getElementById("demo").innerHTML = newPatientAddress;
    
}

//
function loginDoctor() {
    var doctorAddress = document.getElementById("doctore-address").value;
    document.getElementById("demo").innerHTML = doctorAddress;
    
}