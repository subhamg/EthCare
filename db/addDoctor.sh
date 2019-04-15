#!/bin/bash
# Adds a new doctor user

if (( $# != 4 ))
then
    echo "Usage: ./addDoctor <root_uname> <db_name> <doc_id> <doc_password>"
    exit
fi

cat << EOF | mysql --user=$1 --password
CREATE USER '$3'@'%' IDENTIFIED BY '$4';
EOF


