### How to run the project locally
> First you have to clone the project. <br>
> After successfully clone the project, open that folder and type "npm i" <br>
> Then type "npm run start:dev" <br>
> Your project will run on port 5000 <br>

#### Important:
*** 
* You have to make one ".env" file on root folder, where is package.json placed. In that .env file =>
* PORT= Your port. Where you want to run project <br> DATABASE_URL= Your mongodb url <br> node_env= 'development' to view stack. 'production' to hide stack. <br> BCRYPT_SALT_ROUNDS= your encryption number <br> DEFAULT_PASS= If you want to add a default pass. <br> JWT_ACCESS_SECRET= your jwt secret code.
<br>
> Now you are fully ready to run the project