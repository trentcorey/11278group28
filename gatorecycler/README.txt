Credit for the neural network used in this version of Gatorecycler goes to Rokas Balsys at https://pylessons.com/YOLOv3-custom-data/.
The server/CNN directory come from him, save for the few lines of code that were modified for the code to work with Node.js and to update
outdated code. The weights that were used for the test version come from: https://pjreddie.com/darknet/yolo/.

For more information on the neural network model that the information in this website is based on, follow the link above.
The current neural network weights are to be used with Keras, not Tensorflow.

Steps to run locally:

To make it easier to run this website locally, it is recommended you install Docker.
**These instructions are for the Windows OS. If you are running a Linux-based Operating System, you must install docker-compose separately in order for this to work correctly.**

1. Install docker by following this link: https://docs.docker.com/get-docker/
2. Open the command line and navigate to the gatorecycler directory using cd. You should see a client directory, server directory, and a file named "docker-compose.yml".
3. Enter the command "docker-compose build". This will begin building the docker images, which may take a few minutes.
4. Enter the command "docker-compose up -d". This will begin running them. The '-d' option simply means that docker is started
    detached, allowed you to do other things with the command line.
5. Afterward, open the Docker Desktop GUI that should have been installed with Docker. Clicking on the gatorecycler container stack you should
    also see the client and server containers running.
6. Clicking on the client container and navigating to the top right of the Docker GUI there should be a button labelled "Open in browser".
    Clicking on this will open the local instance of the client, or the webpage that communicates with the backend.
7. To view what docker containers are running, run the command "docker ps" in the command line.
8. To shut down the gatorecycler containers, run the command "docker-compose down".

Note: Due to security features by AWS, the RDS we have chosen to host our SQL server, your local version of Gatorecycler may not function correctly, as you
        would not have a whitelisted IP. For full functionality, follow this link to the official website: http://3.21.32.244/#/about.

Github: https://github.com/trentcorey/11278group28
