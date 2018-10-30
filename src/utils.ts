import { SourceControl, CancellationToken, Uri, CancellationTokenSource } from "vscode"
import { GitResourceGroup } from "./gitinterfaces";

interface GitUriParams {
  path: string;
  ref: string;
  submoduleOf?: string;
}

function fromGitUri(uri: Uri): GitUriParams {
  return JSON.parse(uri.query);
}


async function printResourceGroup(repo: any, group: GitResourceGroup) {
  const token: CancellationToken = new CancellationTokenSource().token
  group.resourceStates.length > 0
    ? await Promise.all(group.resourceStates.map(
      async element => {


        try {
          const diffR: string = await repo.diffWithHEAD(element.resourceUri.fsPath)
          console.log(`    ${element.resourceUri}`)
          diffR.split("\n").forEach(l => {
            console.log(`    ${l}`)
          })
          console.log()
        } catch (err) {
          console.error(err)
        }

        // const srcCtrl: SourceControl = repo.sourceControl
        // if(srcCtrl.quickDiffProvider && srcCtrl.quickDiffProvider.provideOriginalResource) {
        //   const result = await srcCtrl.quickDiffProvider.provideOriginalResource(element.resourceUri, token)
        //   console.log(`    +--${result}`)
        // }
      }))
    : console.log("    Nothing")

  console.log("\n")
}

export async function printRepository(repo: any) {
  const changes = repo.workingTreeGroup as GitResourceGroup
  const stagedChanges = repo.indexGroup as GitResourceGroup
  const mergeChanges = repo.mergeGroup as GitResourceGroup

  console.log("Changes:")
  await printResourceGroup(repo, changes)

  console.log("Staged Changes:")
  await printResourceGroup(repo, stagedChanges)

  console.log("Merge Changes:")
  await printResourceGroup(repo, mergeChanges)

}