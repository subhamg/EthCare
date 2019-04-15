#!/bin/bash
# Adds a new patient and creates corresponding table with user_id name

if (( $# != 2 ))
then
    echo "Usage: ./addPatient <user_id> <user_password>"
    exit
fi

cat << EOF | mysql -u root -proot
USE records;
CREATE TABLE $1 (
Prescription VARCHAR(200) NOT NULL,
DoctorName VARCHAR(100) DEFAULT 'Unknown'
);
CREATE TRIGGER $1_trigger BEFORE INSERT ON $1 FOR EACH ROW SET NEW.DoctorName = (select user());
CREATE USER '$1'@'%' IDENTIFIED BY '$2';
GRANT SELECT ON records.$1 TO '$1'@'%';
FLUSH PRIVILEGES;
EOF


