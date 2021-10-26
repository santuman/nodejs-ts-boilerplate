# Node.js TS Boilerplate 😎

Node.js TS Boilerplate is a complete boilerplate for building nodejs backend.

## Setup

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

### Custom Environment variables

You can change environment variables according to your needs from `.devcontainer/docker-compose.yml` file.

```YAML
environment:
    - PORT=3000
    - ENV=development
    - MONGO_URI=mongodb://db:27017/dev-nodejs-ts-boilerplate
    - AGENDA_DB_COLLECTION=test-db-name-agenda-job-collection
    - AGENDA_POOL_TIME=one minute
    - AGENDA_CONCURRENCY=20
    - WINSTON_LOG_LEVEL=debug
```

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
