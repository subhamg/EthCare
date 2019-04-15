#!/bin/bash
# Revokes read and write acesses of a doctor from a user table

if (( $# != 4 ))
then
    echo "Usage: ./revokeDoctorAccessFromPatient.sh <root_uname> <db_name> <doc_id> <user_id>"
    exit
fi

cat << EOF | mysql --user=$1 --password
USE $2;
REVOKE SELECT, INSERT ON $2.$3_$4 FROM '$3'@'%';
DROP VIEW $3_$4;
FLUSH PRIVILEGES;
EOF


