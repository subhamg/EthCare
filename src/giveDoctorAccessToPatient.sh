#!/bin/bash
# Gives read and write accesses doctor to a user

if (( $# != 2 ))
then
    echo "Usage: ./giveDoctorAccessToPatient <doc_id> <user_id>"
    exit
fi

cat << EOF | mysql -u root -proot
USE records;
GRANT SELECT, INSERT ON records.$2 TO '$1'@'%';
FLUSH PRIVILEGES;
EOF


