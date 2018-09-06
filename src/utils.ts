import { GitResourceGroup } from "./gitinterfaces";

function printResourceGroup(group: GitResourceGroup) {
  group.resourceStates.length > 0
    ? group.resourceStates.forEach(element => { console.log(`    ${element.resourceUri}`) })
    : console.log("    Nothing")

  console.log("\n")
}

export function printRepository(repo:any) {
  const changes = repo.workingTreeGroup as GitResourceGroup
  const stagedChanges = repo.indexGroup as GitResourceGroup
  const mergeChanges = repo.mergeGroup as GitResourceGroup

  console.log("Changes:")
  printResourceGroup(changes)

  console.log("Staged Changes:")
  printResourceGroup(stagedChanges)

  console.log("Merge Changes:")
  printResourceGroup(mergeChanges)

}