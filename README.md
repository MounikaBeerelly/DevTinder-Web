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