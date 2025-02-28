# DevTinder Web application

- Create a Vite + react application 
    - **vite** - build tool used to create React.js/Next.js projects.
    - `npm create vite@latest devTinder-web -- --template react` used to create project.
- Remove unnecessary code and create a Hello World app.
- Install `tailwind css`,`postcss` and `autoprefixer`
- install `daisyui` - it builts components for you
- Add navbar component to App.jsx
- Create NavBar.jsx in seperate file.
- Install `react-router-dom` to create routes
- Create BrowserRouter . Routes > Route=/ Body > RouteChildren
- Create an Outlet in Body component
- Create a Footer
## Routes
- Body
    - NavBar
    - Route = /  => Feed
    - Route = /login  => Login
    - Route = /connections  => Connections
    - Route = /profile  => Profile

### Login Page
- Create Login page
- install axios
- install cors in backend => add middleware to with configurations and credentials: true
- handle login api
- whenever you're making api call, so pass axios => { withCredentials: true}

### Redux
- Redux toolkit - `https://redux-toolkit.js.org/tutorials/quick-start`
- install react-redux + @reduxjs/toolkit
- configureStore
- Add provider
- createSlice
- add reducer to store
- Add redux devtools in chrome

- Login and see if your data is coming properly in the store
- NavBar should update as soon as user login
- Refactor our code to add constants file + create a components folder
- You should not be able to access other routes without login
- If token is not present, redirect to login page
- Logout feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit profile feature
- Show toast message on save of profile
- New PAge - See all my connections
- New Page - See all my new connection requests
- Profile page
- feature - accept/reject connection request
- send/ignore usercard from the feed
- signup new user
- E2E testing



## Deployment
- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- connect machine using this command `ssh -i "dev-tinder-secret.pem" ubuntu@ec2-3-145-67-195.us-east-2.compute.amazonaws.com`
- Install Node.js using below commands
    - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    - nvm install 22.10.0 
- clone frontend and backend applications into server

### Deploy frontend application
- navigate to frontend project
- install dependencies -> `npm install`
- run the build -> `npm run build`
- Use `nginx` to deploy the frontend code
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/* /var/www/html
- Enable port :80 of your instance

### Deploy Backend Application
- navigate to backend project
- install dependencies - `npm install`
- Update DB password
- Allowed EC2 instance public IP on mongodb server
- install pm2 - process manager - `npm install pm2 -g`
- start the process `pm2 start npm -- start`
- checking logs `pm2 logs`
- clear logs `pm2 flush <name of the application>`
- pm2 list
- pm2 stop <name of the process>
- pm2 delete <name of the process>
- update the name of the process - `pm2 start npm --name "dev-tinder-backend" -- start`

- Frontend : http://3.145.67.195/
- backend : http://3.145.67.195:3000/
- domain name = devtinder.com => 3.145.67.195
- config nginx - /etc/nginx/sites-available/default
### nginx config
    ``
     server_name 3.145.67.195;

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ``
- Save and Exit  CTRL + X → Y → Enter
- sudo systemctl restart nginx
- Modify BASE_URL in frontend project to "/api"

### custom domain name:
- Purchase domain name in GoDaddy
- DNS management
- Cloudflare - manage the DNS directly
- signup on clouldfare and add domain name
- change the name servers on goDaddy and point it to cloudflare
- wait for sometime till your namesservers uodate => 15minutes
- DNS record: a devtindet.in 3.145.67.195
- Enable SSL for website in cloudflare

## Sending Email via SES
- Create a IAM user
- Give access to AmazonSESFullAccess
- Amazon SES: create an identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK -v3
- code example https://github.com/awsdocs/sws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- setup sesClient
-  Access credentials should be created in IAM uder securityCredentials tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for sending email address
- Make the email dynamic by passing more params to the run function

### dotenv package
- install dotenv package `npm install dotenv`
- create .env file in backend root folder and add **JWT_secret key, PORT number aand DB connection url**
- Manage multiple environments `https://npmjs.com/package/dotenv`


### Scheduling cron jobs
- Installing cron package - npm install node-cron
- Learning about cron expressions syntax - crontab.guru
- schedule a job
- date-fns/ moment for handling dates
- find all the unique emailId who have got connection request in previous day
- send email
- explore queue mechanism to send bulk emails
- Amazon SES bulk emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages to handle queue mechanisms

## Razorpay payment gateway integration:
- It is one of the famous payment gateway provider.
- Sign up on Razorpay & complete KYC
- Go to razorpay account and open `Test mode dashboard`.
- Create two APIs
    - create order
    - payment verify
- FE - user clicks on `pay now` button, create order api trigger to the backend.
- BE - sends create order + secret key to Razorpay.
- Razorpay - creates orderId and send back to the backend.
- BE - send order Id to the frontend.
- FE - Once received the orderId, payment dashboard will open, and completes the payment.
- Razorpay - After the payment, immediately Razorpay sent payment success/failure status to the backend.
- FE - FE sends payment verify API to the backend.
- BE - sent back to the success/failure message to the FE.

### STEPS :
- Create a Ui for premium page
- Create an API for create payment annd verify payment
- Added key and secret in env file
- Initialized Razorpay in utils
- Creating order on Razorpay
- Create Schema and model
- Saved the order in payments collection
- make the API dynamic
- setup razorpay webhook on live api
- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/