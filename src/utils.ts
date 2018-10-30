import { CancellationToken, Uri, CancellationTokenSource } from "vscode"
import { IGitResourceGroup } from "./gitinterfaces"

interface IRepository {
  diffWithHEAD(path: string): Promise<string>
  workingTreeGroup: IGitResourceGroup
  indexGroup: IGitResourceGroup
  mergeGroup: IGitResourceGroup
}

async function printResourceGroup(repo: IRepository, group: IGitResourceGroup) {
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
        // const token: CancellationToken = new CancellationTokenSource().token
        // if(srcCtrl.quickDiffProvider && srcCtrl.quickDiffProvider.provideOriginalResource) {
        //   const result = await srcCtrl.quickDiffProvider.provideOriginalResource(element.resourceUri, token)
        //   console.log(`    +--${result}`)
        // }
      }))
    : console.log("    Nothing")

  console.log("\n")
}

export async function printRepository(repo: IRepository) {
  const changes = repo.workingTreeGroup
  const stagedChanges = repo.indexGroup
  const mergeChanges = repo.mergeGroup

  console.log("Changes:")
  await printResourceGroup(repo, changes)

  console.log("Staged Changes:")
  await printResourceGroup(repo, stagedChanges)

  console.log("Merge Changes:")
  await printResourceGroup(repo, mergeChanges)

}
