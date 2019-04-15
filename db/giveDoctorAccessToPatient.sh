#!/bin/bash
# Gives read and write accesses doctor to a user

if (( $# != 4 ))
then
    echo "Usage: ./giveDoctorAccessToPatient <root_uname> <db_name> <doc_id> <user_id>"
    exit
fi

cat << EOF | mysql --user=$1 --password
USE $2;
# CREATE VIEW $3_$4 as SELECT * FROM $4 WHERE DoctorName like '$3%';
# CREATE VIEW $3_$4 as SELECT * FROM $4;
GRANT SELECT, INSERT ON $2.$4 TO '$3'@'%';
FLUSH PRIVILEGES;
EOF


