# react-ip-overlap
React project for proving an IP design concept

This [repo](https://github.com/michaelmong/react-ip-overlap "react-ip-overlap") has been created to prove a concept about IP design. Assume there is an IPv4  address with a list of networks, how to figure out whether this IP address is in those IP networks in the list.

I proposed a way to convert IP address from 256-based number to decimal number, and check whether this decimal number is between the first IP address and the last IP address or not. Of course, the first IP address and the last IP address must be converted to decimal number as well. Well, the first IP address is always the network ID, and the last IP address is summation of first IP address and total number in the network, which can be calculated by network mask, and minus one. I think this is easier way to verify comparing with another way that checks the network ID in binary.

To prove this concept, I prefer to use React frontend with Hook, offering a user to fill-in an IP address with a list of IP network, which is updatable by user. Beside the react code provides a calculation 256-based number conversion to decimal number, and compare between that IP address and those IP network. Input validating is provided as well to ensure that there will be no error on runtime.

Below are the list and detail that you can find in the git repo. I also give a guideline to deploy React in the google cloud platform (GCP).

1. ``index.js``, imports ``Ip_hook.js`` - Since by default I allocated 4 IP networks, there should be some reusable codes in common that these 4 networks can share. Unfortunately, I didn't optimize this reusable code because of time limit. So the code inside Ip_hook.js may not be very effective. Most of the calculations and verification are in useEffect hook.

2. To deploy in GCP, I found some documents on the Internet, which lead me to *Error 502, Bad Gateway* respone. So, I would like to recommend the following way (from [Community Tutorials](https://cloud.google.com/community/tutorials/deploy-react-nginx-cloud-run)) to deploy React project on google cloud platform.
    * Run "npm run build" on React project to creat build directory.
    * Go to [API Library](https://console.cloud.google.com/apis/library?_ga=2.252368201.1577926873.1587893763-322661685.1578156092&project=react-standard-36054799&folder&organizationId) and search with enable Cloud Run API, Google Container Registry API and Cloud Build API.
    * Prepare ``app.yaml`` in project directory with the following content,
```
runtime: nodejs12
```
    * Prepare ``nginx.conf`` in project directory with the following content,
```
server {
     listen       8080;
     server_name  0.0.0.0;

     location / {
         root   /usr/share/nginx/html;
         index  index.html index.htm;
         try_files $uri /index.html;
     }

     gzip on;
     gzip_vary on;
     gzip_min_length 10240;
     gzip_proxied expired no-cache no-store private auth;
     gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
     gzip_disable "MSIE [1-6]\.";

}
```
    * Prepare ``Dockerfile`` in project directory with the following content,
```
# build environment
FROM node:8-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```
    * Run ``gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/cra-cloud-run`` to build Docker container
    * Run ``gcloud  beta run deploy --image gcr.io/ID_OF_YOUR_PROJECT/cra-cloud-run --platform managed`` to deploy on GCP, get the URL from the printout and use it to promote your project, e.g. [https://cra-cloud-run-qxdbuhdavq-de.a.run.app/](https://cra-cloud-run-qxdbuhdavq-de.a.run.app/) is for my project.
