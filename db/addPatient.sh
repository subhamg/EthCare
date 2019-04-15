#!/bin/bash
# Adds a new patient and creates corresponding table with user_id name

if (( $# != 4 ))
then
    echo "Usage: ./addPatient <root_uname> <db_name> <user_id> <user_password>"
    exit
fi

cat << EOF | mysql --user=$1 --password
USE $2;
CREATE TABLE $3 (
Prescription VARCHAR(200) NOT NULL,
DoctorName VARCHAR(100) DEFAULT 'Unknown'
);
CREATE TRIGGER $3_trigger BEFORE INSERT ON $3 FOR EACH ROW SET NEW.DoctorName = (select user());
CREATE USER '$3'@'%' IDENTIFIED BY '$4';
GRANT SELECT ON $2.$3 TO '$3'@'%';
FLUSH PRIVILEGES;
EOF


