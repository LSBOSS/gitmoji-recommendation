'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "gitmoji-recommendation" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', async () => {
        const picked = await vscode.window.showQuickPick(["wrench", "bug", "hammer"].map(s => `:${s}:`), { canPickMany: false })
        const git = vscode.extensions.getExtension("vscode.git")
        if (git) {
          //git.exports
          const extension = await git.activate()
          const model = extension._model

          //const ws = (vscode.workspace.workspaceFolders || [{ uri: { fsPath: "" }}])[0]
          //const wsFolder = ws.uri.fsPath
          //const repo = await model._openRepository(wsFolder)
          const openRepo = model.openRepositories[0].repository
          if (openRepo) {
            const sourceControl: vscode.SourceControl = openRepo.sourceControl || openRepo._sourceControl
            sourceControl.inputBox.value = ":boom: finally have it!"
          }
        }

        //const gitSCM = vscode.scm.createSourceControl('git', "Git");
        //gitSCM.rootUri
        // gitSCM.inputBox.value = ":hankey: Deine Muddah";
        // gitSCM.dispose()
        // Display a message box to the user
        vscode.window.showInformationMessage(`Hello World! ${picked}`);
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}
