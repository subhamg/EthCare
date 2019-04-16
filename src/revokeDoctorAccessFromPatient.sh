#!/bin/bash
# Revokes read and write acesses of a doctor from a user table

if (( $# != 2 ))
then
    echo "Usage: ./revokeDoctorAccessFromPatient.sh <doc_id> <user_id>"
    exit
fi

cat << EOF | mysql -u root -proot
USE records;
REVOKE SELECT, INSERT ON records.$2 FROM '$1'@'%';
# DROP VIEW $1_$2;
FLUSH PRIVILEGES;
EOF


