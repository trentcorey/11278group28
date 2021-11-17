FROM nikolaik/python-nodejs:python3.6-nodejs16 AS build

RUN apt-get update
RUN apt install -y libgl1-mesa-glx

RUN pip3 install matplotlib
RUN pip3 install keras
RUN pip3 install opencv-python
RUN pip3 install numpy
RUN pip3 install tensorflow-cpu
RUN pip3 install Pillow
RUN pip3 install matplotlib
RUN pip3 install opencv-contrib-python
    
WORKDIR /usr/src/server
COPY . .
run npm install --production
EXPOSE 8081
CMD ["node", "server.js"]