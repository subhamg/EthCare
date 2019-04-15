#!/bin/bash
# Adds a new doctor user

if (( $# != 2 ))
then
    echo "Usage: ./addDoctor <doc_id> <doc_password>"
    exit
fi

cat << EOF | mysql -u root -proot
CREATE USER '$1'@'%' IDENTIFIED BY '$2';
EOF


