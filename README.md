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

    #### Clone with HTTPS

        ```BASH
        git clone https://github.com/SantoshCode/nodejs-ts-boilerplate.git
        ```

    or,

    #### Clone with SSH
        ```BASH
        git clone git@github.com:SantoshCode/nodejs-ts-boilerplate.git
        ```

3. Change to the cloned folder

    ```BASH
    cd nodejs-ts-boilerplate
    code .
    ```

4. Install the recommended VS Code extensions found in `missionlz/.vscode/extensions.json` file. Including the "Remote Development" extension from Microsoft.

   > **NOTE:** When VS Code is correctly started from the MissionLZ project root directory, you should see folders named `.devcontainer`, `.vscode`, and `src` at the root of the VS Code Explorer pane. In the startup process, VS Code reads the file `.vscode/extensions.json` (relative from the current working directory) and may prompt the user to install any extensions referenced here that are not already installed.

5. In the VS Code command palette `(Ctrl + Shift + P)` or `(Cmd + Shift + P)` for macOS, run this command:

    ```VSCODE
    Remote-Containers: Reopen in Container
    ```

    > **NOTE:** The container will build on your machine. The first build may take several minutes; the `Reopen in Container` command will be much faster after the initial container build, and VS Code will prompt you if the container needs to be rebuilt when the `Dockerfile` or container configuration settings have changed.

    When logged into the devcontainer's terminal, the working directory changes to `vscode@missionlz-dev:/workspaces/missionlz$`


### Authenticating to GitHub inside vscode devcontainer

> **NOTE:** Below commands is suppose to execute inside terminal of vscode devcontainer. You need to perform every setup show by command `gh auth login`. Also use SSH protocol.

```BASH
gh auth login

? What is your preferred protocol for Git operations? SSH
? Generate a new SSH key to add to your GitHub account? Yes
? Enter a passphrase for your new SSH key (Optional)
? How would you like to authenticate GitHub CLI? Login with a web browser
```
