import { SourceControlResourceGroup, SourceControlResourceState } from "vscode"

export interface GitResourceGroup extends SourceControlResourceGroup {
    resourceStates: SourceControlResourceState[];
}
