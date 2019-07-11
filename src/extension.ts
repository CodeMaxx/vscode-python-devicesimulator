import * as vscode from "vscode";
import * as path from "path";
import * as cp from "child_process";
import * as fs from "fs";
import * as open from "open";
import { CONSTANTS, DialogResponses } from "./constants";

let shouldShowNewProject: boolean = true;

function loadScript(context: vscode.ExtensionContext, path: string) {
  return `<script src="${vscode.Uri.file(context.asAbsolutePath(path))
    .with({ scheme: "vscode-resource" })
    .toString()}"></script>`;
}

// Extension activation
export function activate(context: vscode.ExtensionContext) {
  console.info(CONSTANTS.INFO.EXTENSION_ACTIVATED);

  let currentPanel: vscode.WebviewPanel | undefined = undefined;
  let outChannel: vscode.OutputChannel | undefined = undefined;
  let childProcess: cp.ChildProcess;
  let messageListener: vscode.Disposable;

  // Add our library path to settings.json for autocomplete functionality
  updatePythonExtraPaths();

  if (outChannel === undefined) {
    outChannel = vscode.window.createOutputChannel(CONSTANTS.NAME);
    logToOutputChannel(outChannel, CONSTANTS.INFO.WELCOME_OUTPUT_TAB, true);
  }

  const openWebview = () => {
    if (currentPanel) {
      currentPanel.reveal(vscode.ViewColumn.Two);
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        "adafruitSimulator",
        CONSTANTS.LABEL.WEBVIEW_PANEL,
        vscode.ViewColumn.Two,
        {
          // Only allow the webview to access resources in our extension's media directory
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "out"))
          ],
          enableScripts: true
        }
      );

      currentPanel.webview.html = getWebviewContent(context);

      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
        },
        undefined,
        context.subscriptions
      );
    }
  };

  // Open Simulator on the webview
  const openSimulator = vscode.commands.registerCommand(
    "pacifica.openSimulator",
    openWebview
  );

  const newProject = vscode.commands.registerCommand(
    "pacifica.newProject",
    () => {
      const fileName = "template.py";
      const filePath = __dirname + path.sep + fileName;
      const file = fs.readFileSync(filePath, "utf8");

      if (shouldShowNewProject) {
        vscode.window
          .showInformationMessage(
            CONSTANTS.INFO.NEW_PROJECT,
            ...[
              DialogResponses.DONT_SHOW,
              DialogResponses.EXAMPLE_CODE,
              DialogResponses.TUTORIALS
            ]
          )
          .then((selection: vscode.MessageItem | undefined) => {
            if (selection === DialogResponses.DONT_SHOW) {
              shouldShowNewProject = false;
            } else if (selection === DialogResponses.EXAMPLE_CODE) {
              open(CONSTANTS.LINKS.EXAMPLE_CODE);
            } else if (selection === DialogResponses.TUTORIALS) {
              open(CONSTANTS.LINKS.TUTORIALS);
            }
          });
      }

      openWebview();

      vscode.workspace
        .openTextDocument({ content: file, language: "en" })
        .then((template: vscode.TextDocument) => {
          vscode.window.showTextDocument(template, 1, false);
        }),
        (error: any) => {
          console.error(`Failed to open a new text document:  ${error}`);
        };
    }
  );

  // Send message to the webview
  const runSimulator = vscode.commands.registerCommand(
    "pacifica.runSimulator",
    () => {
      openWebview();

      if (!currentPanel) {
        return;
      }
      console.info(CONSTANTS.INFO.RUNNING_CODE);
      const activeTextEditor: vscode.TextEditor | undefined =
        vscode.window.activeTextEditor;
      let currentFileAbsPath: string = "";

      if (activeTextEditor) {
        currentFileAbsPath = activeTextEditor.document.fileName;
      }

      // Get the Python script path (And the special URI to use with the webview)
      // const onDiskPath = vscode.Uri.file(
      //   path.join(context.extensionPath, "out", "setup.py")
      // );
      // const scriptPath = onDiskPath.with({ scheme: "vscode-resource" });

      // Create the Python process (after killing the one running if any)
      if (childProcess !== undefined) {
        if (currentPanel) {
          console.info("Sending clearing state command");
          currentPanel.webview.postMessage({ command: "reset-state" });
        }
        // TODO: We need to check the process was correctly killed
        childProcess.kill();
      }

      logToOutputChannel(outChannel, CONSTANTS.INFO.DEPLOY_SIMULATOR);

      childProcess = cp.spawn("python", [
        getPathToScript(context, "out", "setup.py"),
        currentFileAbsPath
      ]);

      let dataFromTheProcess = "";
      let oldMessage = "";

      // Data received from Python process
      childProcess.stdout.on("data", data => {
        dataFromTheProcess = data.toString();
        if (currentPanel) {
          // Process the data from the process and send one state at a time
          dataFromTheProcess.split("\0").forEach(message => {
            if (currentPanel && message.length > 0 && message != oldMessage) {
              oldMessage = message;
              let messageToWebview;
              // Check the message is a JSON
              try {
                messageToWebview = JSON.parse(message);
                // Check the JSON is a state
                switch (messageToWebview.type) {
                  case "state":
                    console.log(
                      `Process state output = ${messageToWebview.data}`
                    );
                    currentPanel.webview.postMessage({
                      command: "set-state",
                      state: JSON.parse(messageToWebview.data)
                    });
                    break;

                  default:
                    console.log(
                      `Non-state JSON output from the process : ${messageToWebview}`
                    );
                    break;
                }
              } catch (err) {
                console.log(`Non-JSON output from the process :  ${message}`);
              }
            }
          });
        }
      });

      // Std error output
      childProcess.stderr.on("data", data => {
        console.error(`Error from the Python process through stderr: ${data}`);
        logToOutputChannel(outChannel, CONSTANTS.ERROR.STDERR(data), true);
        if (currentPanel) {
          console.log("Sending clearing state command");
          currentPanel.webview.postMessage({ command: "reset-state" });
        }
      });

      // When the process is done
      childProcess.on("end", (code: number) => {
        console.info(`Command execution exited with code: ${code}`);
      });

      if (messageListener !== undefined) {
        messageListener.dispose();
        const index = context.subscriptions.indexOf(messageListener);
        if (index > -1) {
          context.subscriptions.splice(index, 1);
        }
      }
      // Handle messages from webview
      messageListener = currentPanel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case "button-press":
              // Send input to the Python process
              console.log("About to write");
              console.log(JSON.stringify(message.text) + "\n");
              childProcess.stdin.write(JSON.stringify(message.text) + "\n");
              break;
            default:
              vscode.window.showInformationMessage(
                CONSTANTS.ERROR.UNEXPECTED_MESSAGE
              );
              break;
          }
        },
        undefined,
        context.subscriptions
      );
    }
  );

  // Send message to the webview
  let runDevice = vscode.commands.registerCommand("pacifica.runDevice", () => {
    console.info("Sending code to device");

    logToOutputChannel(outChannel, CONSTANTS.INFO.DEPLOY_DEVICE);

    const activeTextEditor: vscode.TextEditor | undefined =
      vscode.window.activeTextEditor;
    let currentFileAbsPath: string = "";

    if (activeTextEditor) {
      currentFileAbsPath = activeTextEditor.document.fileName;
    }

    // Get the Python script path (And the special URI to use with the webview)
    // const onDiskPath = vscode.Uri.file(
    //   path.join(context.extensionPath, "out", "device.py")
    // );
    // const scriptPath = onDiskPath.with({ scheme: "vscode-resource" });

    const deviceProcess = cp.spawn("python", [
      getPathToScript(context, "out", "device.py"),
      currentFileAbsPath
    ]);

    let dataFromTheProcess = "";

    // Data received from Python process
    deviceProcess.stdout.on("data", data => {
      dataFromTheProcess = data.toString();
      console.log(`Device output = ${dataFromTheProcess}`);
      let messageToWebview;
      try {
        messageToWebview = JSON.parse(dataFromTheProcess);
        // Check the JSON is a state
        switch (messageToWebview.type) {
          case "complete":
            logToOutputChannel(outChannel, CONSTANTS.INFO.DEPLOY_SUCCESS);
            break;

          case "no-device":
            vscode.window
              .showErrorMessage(
                CONSTANTS.ERROR.NO_DEVICE,
                ...[DialogResponses.HELP]
              )
              .then((selection: vscode.MessageItem | undefined) => {
                if (selection === DialogResponses.HELP) {
                  open(CONSTANTS.LINKS.HELP);
                }
              });
            break;

          default:
            console.log(
              `Non-state JSON output from the process : ${messageToWebview}`
            );
            break;
        }
      } catch (err) {
        console.log(
          `Non-JSON output from the process :  ${dataFromTheProcess}`
        );
      }
    });

    // Std error output
    deviceProcess.stderr.on("data", data => {
      console.error(
        `Error from the Python device process through stderr: ${data}`
      );
      logToOutputChannel(outChannel, `[ERROR] ${data} \n`, true);
    });

    // When the process is done
    deviceProcess.on("end", (code: number) => {
      console.info(`Command execution exited with code: ${code}`);
    });
  });

  // Debugger configuration
  const debugConfigurationProvider = new SimulatorConfigurationProvider(
    getPathToScript(context, "out", "setup.py")
  );

  context.subscriptions.push(
    openSimulator,
    runSimulator,
    runDevice,
    newProject,
    vscode.debug.registerDebugConfigurationProvider(
      "python",
      debugConfigurationProvider
    )
  );
}

const getPathToScript = (
  context: vscode.ExtensionContext,
  folderName: string,
  fileName: string
) => {
  const onDiskPath = vscode.Uri.file(
    path.join(context.extensionPath, folderName, fileName)
  );
  const scriptPath = onDiskPath.with({ scheme: "vscode-resource" });
  return scriptPath.fsPath;
};

const updatePythonExtraPaths = () => {
  const pathToLib: string = __dirname;
  const currentExtraPaths: string[] =
    vscode.workspace.getConfiguration().get("python.autoComplete.extraPaths") ||
    [];
  if (!currentExtraPaths.includes(pathToLib)) {
    currentExtraPaths.push(pathToLib);
  }
  vscode.workspace
    .getConfiguration()
    .update(
      "python.autoComplete.extraPaths",
      currentExtraPaths,
      vscode.ConfigurationTarget.Global
    );
};

const logToOutputChannel = (
  outChannel: vscode.OutputChannel | undefined,
  message: string,
  show: boolean = false
) => {
  if (outChannel) {
    if (show) outChannel.show();
    outChannel.append(message);
  }
};

function getWebviewContent(context: vscode.ExtensionContext) {
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>${CONSTANTS.NAME}</title>
            </head>
          <body>
            <div id="root"></div>
            <script>
              const vscode = acquireVsCodeApi();
            </script>
            ${loadScript(context, "out/vendor.js")}
            ${loadScript(context, "out/simulator.js")}
          </body>
          </html>`;
}

class SimulatorConfigurationProvider
  implements vscode.DebugConfigurationProvider {
  constructor(private pathToScript: string) {}

  /**
   * Massage a debug configuration just before a debug session is being launched,
   * e.g. add all missing attributes to the debug configuration.
   */
  public resolveDebugConfiguration(
    folder: vscode.WorkspaceFolder | undefined,
    config: vscode.DebugConfiguration,
    token?: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.DebugConfiguration> {
    // console.error("PPAAATTHH : " +'${file}');
    // config.program = 'C:\\Users\\t-chcido\\Documents\\Adafruit\\testing\\py-debug-extension\\scripts\\main.py';
    // config.args = ['C:\\Users\\t-chcido\\Documents\\Adafruit\\testing\\py-debug-extension\\scripts\\code.py'];
    // config.rules = [{"path": "C:\\Users\\t-chcido\\Documents\\Adafruit\\testing\\py-debug-extension\\scripts\\main.py", "include":false}]

    // Setup.py Path
    // const onDiskPath = vscode.Uri.file(
    // 	path.join(this.context.extensionPath, "scripts", "main.py")
    //   );
    // const scriptPath = onDiskPath.with({ scheme: "vscode-resource" });
    // const setupScriptPathString = scriptPath.fsPath;
    /*
		config.program = this.pathToScript;

		// Code.py path
		const activeTextEditor = vscode.window.activeTextEditor;
		// let currentFileAbsPath: string = "";
		if (activeTextEditor && activeTextEditor.document.languageId === 'python') {
			const currentFileAbsPath = activeTextEditor.document.fileName;
      config.args = [currentFileAbsPath];
		}

		// Ignore setup.py
		config.rules = [{"path": this.pathToScript, "include":false}];
    */

    // Check config name
    if (config.name === "Pacifica Simulator Debugger") {
      // TODO: Move config name to constants
      const activeTextEditor = vscode.window.activeTextEditor;
      if (activeTextEditor) {
        // TODO : What happens if there is o activeTextEditor ?
        // Check file name
        const currentFilePath = activeTextEditor.document.fileName;
        const name = currentFilePath.substr(currentFilePath.length - 7, 7); // TODO: Move 7 to constants
        let validName = name === "code.py" || name === "main.py"; // TODO : Move names to constants + Move to function

        // Check file type // TODO : Check if we need to check language ID
        if (
          !(activeTextEditor.document.languageId === "python") ||
          !validName
        ) {
          return vscode.window
            .showErrorMessage("Invalid code file selected to debug.")
            .then(_ => {
              return undefined; // Abort launch
            });
        }
        // Set setup path as program
        config.program = this.pathToScript;
        // Set code.py path as args
        config.args = [currentFilePath];
        // Set rules
        config.rules = [
          // {
          //   module: "adafruit_circuitplayground",
          //   include: false
          // },
          { path: this.pathToScript, include: false },
          {
            path:
              "c:\\Users\\t-chcido\\Documents\\Adafruit\\git\\debugger\\vscode-python-embedded\\out\\adafruit_circuitplayground\\*",
            include: false
          },
          // { module: "adafruit_circuitplayground", include: false },
          { module: "simpleaudio", include: false }
        ];
      }
    } //"c:\\Users\\t-chcido\\Documents\\Adafruit\\git\\debugger\\vscode-python-embedded\\out\\adafruit_circuitplayground"
    // Abort / show error invalid file
    if (!config.program) {
      return vscode.window
        .showInformationMessage("Cannot find a program to debug")
        .then(_ => {
          return undefined; // Abort launch
        });
    }
    return config;

    //   // Setup path
    //   config.program = this.pathToScript;

    //   // Code.py path
    //   const activeTextEditor = vscode.window.activeTextEditor;
    //   if (activeTextEditor && activeTextEditor.document.languageId === 'python') {
    //     const currentFileAbsPath = activeTextEditor.document.fileName;
    //     config.args = [currentFileAbsPath];
    //   }

    //  // Ignore setup.py
    //  config.rules = [{"path": this.pathToScript, "include":false}];
    // 	if (!config.program) {
    // 		return vscode.window.showInformationMessage("Cannot find a program to debug").then(_ => {
    // 			return undefined;	// Abort launch
    // 		});
    // 	}

    // 	return config;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
