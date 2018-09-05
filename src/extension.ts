import * as vscode from "vscode"

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
          const sourceControl: vscode.SourceControl =
            openRepo.sourceControl || openRepo._sourceControl
          sourceControl.inputBox.value = ":boom: finally have it!"
        }
      }

      // Create a new SCM Instance
      // const gitSCM = vscode.scm.createSourceControl("git", "Git");
      // gitSCM.rootUri
      // gitSCM.inputBox.value = ":hankey: Deine Muddah";
      // gitSCM.dispose()
      // Display a message box to the user
      vscode.window.showInformationMessage(`Hello World! ${picked}`)
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
