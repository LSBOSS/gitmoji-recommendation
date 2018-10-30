import { SourceControlResourceGroup, SourceControlResourceState } from "vscode"

export interface IGitResourceGroup extends SourceControlResourceGroup {
    resourceStates: SourceControlResourceState[]
}
