import {Directories} from "@/types/directories.interface";


export default function getDirectoryTree({directories, directoryId}: {
    directories: Directories
    directoryId: number;
}) {
    let path = directories[directoryId].name;
    const tree = [directoryId]
    let parentDirectoryId = directories[directoryId].parentId;
    while (parentDirectoryId !== -1) {
        tree.push(parentDirectoryId);
        path = directories[parentDirectoryId].name + '/' + path;
        parentDirectoryId = directories[parentDirectoryId].parentId;
    }
    tree.reverse()

    return {tree, path}
}