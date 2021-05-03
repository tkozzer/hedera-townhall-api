# Purpose

This directory is used to download json files from the Hedera Community Town Hall, organize, clean, and add additional information relevant to those json files.

## Prerequisites

- Python 3.x

## Create a python virtual environment in the directory

Run this on your terminal command-line:

    python3 -m venv th_data_env 

Now you will need to activate the python virtual environment

    source th_data_env/bin/activate

You should now see (th_data_env) at the beginning of your command-line prompt

<img width="651" alt="env-example" src="https://user-images.githubusercontent.com/51497123/116936544-9ea43700-ac2d-11eb-8cfa-af0a7ea39cab.png">

Next you will need to install all python dependencies

    pip3 install -r requirements.txt

Now that you should be able to run main.py

    python3 main.py

