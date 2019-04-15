#!/bin/bash
# Initializes the database

if (( $# != 2 ))
then
    echo "Usage: ./initialization.sh <root-username> <database-to-create>"
    exit
fi

cat << EOF | mysql --user=$1 --password

CREATE DATABASE $2;
SET GLOBAL validate_password_policy=LOW;
SET GLOBAL validate_password_length = 1;
SET GLOBAL validate_password_number_count = 0;

EOF


