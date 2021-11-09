# Node.js TS Boilerplate 😎

Node.js TS Boilerplate is a complete boilerplate for building nodejs backend.

## Setup

### **If you want to use dev container**

All configuration related to the development container is in the `.devcontainer` directory.

- `devcontainer.json`: Configuration settings for the development container
- `Dockerfile`: Docker container definition for the development container

### Step-by-Step

1. Ensure you have the prerequisites installed as described here: <https://code.visualstudio.com/docs/remote/containers>

    - Windows: Docker Desktop 2.0+ on Windows 10 Pro/Enterprise. Windows 10 Home (2004+) requires Docker Desktop 2.3+ and the WSL 2 back-end. (Docker Toolbox is not supported. Windows container images are not supported.)
    - macOS: Docker Desktop 2.0+.
    - Linux: Docker CE/EE 18.06+ and Docker Compose 1.21+. (The Ubuntu snap package is not supported.)

2. Clone this repository

    ```BASH
    git clone https://github.com/SantoshCode/nodejs-ts-boilerplate.git
    ```

    or,

    ```BASH
    git clone git@github.com:SantoshCode/nodejs-ts-boilerplate.git
    ```

3. Change to the cloned folder

    ```BASH
    cd nodejs-ts-boilerplate
    code .
    ```

4. Install the recommended VS Code extensions found in `devcontainer.json` file. Including the "Remote Development" extension from Microsoft.

5. In the VS Code command palette `(Ctrl + Shift + P)` or `(Cmd + Shift + P)` for macOS, run this command:

    ```VSCODE
    Remote-Containers: Reopen in Container
    ```

    > **NOTE:** The container will build on your machine. The first build may take several minutes; the `Reopen in Container` command will be much faster after the initial container build, and VS Code will prompt you if the container needs to be rebuilt when the `Dockerfile` or container configuration settings have changed.

    When logged into the devcontainer's terminal, the working directory changes to `vscode@missionlz-dev:/workspaces/nodejs-ts-boilerplate`

6. Now run application in terminal (inside devcontainer)

    > **NOTE:** This command will run mongodb service on port `27020` and our application will run on port `3000`.

    ```BASH
    npm run dev
    ```

7. Run mongodb service in Compass <https://www.mongodb.com/products/compass>

    Connect to `mongodb://localhost:27020` from Mongodb Compass

8. Application will run on port `3000`.

## **If you don't want to run inside dev container**

1. Install dependencies via `npm install`

2. Make sure `dotenv` package is installed and open `config/keys.ts` and uncomment following line:

    ```typescript
    // import dotenv from 'dotenv'
    // import path from 'path'

    // const envFound = dotenv.config({
    //  path: path.join(path.resolve(), '.env'),
    // })

    // if (envFound.error) {
    //  throw new Error("⚠️ Couldn't find .env file ⚠️")
    // }

    ```

3. You can start your application `npm run dev`.

### Custom Environment variables

You can change environment variables according to your needs from `.devcontainer/.env` file. You can use .env.example as reference

```bash
# DEVELOPMENT/APPLICATION
PORT=3000
ENV=development

# MONGODB
MONGO_URI=mongodb://db:27017/dev-nodejs-ts-boilerplate # for dev container
#or,
MONGO_URI=mongodb://localhost:27017/dev-nodejs-ts-boilerplate # for not dev container


# AGENDA
AGENDA_DB_COLLECTION=test-db-name-agenda-job-collection
AGENDA_POOL_TIME=one minute
AGENDA_CONCURRENCY=20

# WINSTON
WINSTON_LOG_LEVEL=debug

# AWS SES
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# EMAIL
EMAIL_FROM=company@gmail.com
EMAIL_REPLY_TO=noreply@org.com
EMAIL_ADMIN_EMAIL_ADDRESS=adminemail@gmail.com

# JWT
JWT_SECRET_ACCESS_TOKEN=asdasdoiuo
JWT_ACCESS_TOKEN_EXPIRY_IN_MINUTES=15

JWT_SECRET_REFRESH_TOKEN=0asdasdkj9ad
JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES=10080

# FRONTEND URL
FRONTEND_URL=http://localhost:9000
```

**IMP:** `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` is not Amazon aws SES SMTP credentials. You can get these keys by creating separate IAM User and generate them from `My Security Credentials` tab.

### Authenticating to GitHub inside vscode devcontainer

By doing this you can perform any github actions with your git credentials.

> **NOTE:** Below commands is suppose to execute inside terminal of vscode devcontainer. You need to perform every setup show by command `gh auth login`. Also use SSH protocol.

```BASH
gh auth login

? What is your preferred protocol for Git operations? SSH
? Generate a new SSH key to add to your GitHub account? Yes
? Enter a passphrase for your new SSH key (Optional)
? How would you like to authenticate GitHub CLI? Login with a web browser
```
