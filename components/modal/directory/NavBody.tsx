import {Directories} from "@/types/directories.interface";
import DirectoryModalNavItem from "@/components/modal/directory/NavItem";

interface NavBodyProps {
    directories: Directories,
    stack: number[]
    setStack: (newStack: number[]) => void
}

export default function NavBody({directories, stack, setStack}: NavBodyProps) {

    return (
        <>
            {
                stack.length > 0
                    ? directories[stack[stack.length - 1]].children.length > 0
                        ? directories[stack[stack.length - 1]].children.map((directoryId: number) => {
                            const name = directories[directoryId].name
                            const postCount = directories[directoryId].postCount
                            return (
                                <DirectoryModalNavItem
                                    key={directoryId}
                                    stack={stack}
                                    setStack={setStack}
                                    name={name}
                                    postCount={postCount}
                                    directoryId={directoryId}/>
                            )
                        })
                        : <DirectoryModalNavItem
                            key={-1}
                            stack={stack}
                            setStack={() => null}
                            name={"하위 폴더가 없어요"}
                            postCount={null}
                            directoryId={0}/>
                    : null
            }
        </>
    )

}