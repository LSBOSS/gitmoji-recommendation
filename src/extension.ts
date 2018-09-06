import * as vscode from "vscode"
import { printRepository } from "./utils"

// this method is called when your extension is activated (very first time the command is executed)
export function activate(context: vscode.ExtensionContext) {
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "extension.recommendGitmoji",
    async () => {
      const picked = await vscode.window.showQuickPick(
        ["wrench", "bug", "hammer"].map(s => `:${s}:`),
        { canPickMany: false }
      )
      const gitExtension = vscode.extensions.getExtension("vscode.git")
      if (gitExtension) {
        const extension = await gitExtension.activate()
        const model = extension.model || extension._model

        // Load repository via model
        // const ws = (vscode.workspace.workspaceFolders || [{ uri: { fsPath: "" }}])[0]
        // const wsFolder = ws.uri.fsPath
        // const repo = await model._openRepository(wsFolder)
        const openRepo = model.openRepositories[0].repository

        if (openRepo) {
          console.log("### Current repository state:")
          printRepository(openRepo)

          openRepo.onDidRunGitStatus(() => {
            console.log("### Repository changed:")
            printRepository(openRepo)
          })

          const sourceControl: vscode.SourceControl = openRepo.sourceControl || openRepo._sourceControl
          sourceControl.inputBox.value = ":boom: finally have it!"
        }
      }

      vscode.window.showInformationMessage(`Hello World! ${picked}`)
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
