import {Directories} from "@/types/directories.interface";
import NavItem from "@/components/modal/common/NavItem";

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
                        ? directories[stack[stack.length - 1]].children.map((directoryId: number, index: number ) => {
                            const name = directories[directoryId].name
                            const postCount = directories[directoryId].postCount
                            return (
                                <NavItem
                                    key={directoryId}
                                    name={name}
                                    postCount={postCount}
                                    onClick={e => {
                                        e.preventDefault()
                                        const newStack = [...stack]
                                        newStack.push(directoryId)
                                        setStack(newStack)
                                    }}/>
                            )
                        })
                        : <NavItem
                            key={-1}
                            name={"하위 폴더가 없어요"}
                            postCount={null}
                            onClick={e => null}/>
                    : null
            }
        </>
    )

}