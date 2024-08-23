import {Tags} from "@/types/tags.interface";
import NavItem from "@/components/modal/common/NavItem";

interface NavBodyProps {
    data: Tags
    stack: number[]
    setStack: (newStack: number[]) => void
}

export default function NavBody({data, stack, setStack}: NavBodyProps) {

    return (
        <>
            {
                Object.keys(data).map((tagId: string) => {
                    const name = data[tagId].name
                    const postCount = data[tagId].postCount

                    return (
                        <NavItem
                            key={tagId}
                            name={name}
                            isSelected={stack.includes(+tagId)}
                            postCount={postCount}
                            onClick={() => {
                                let newStack = [...stack]
                                if (newStack.includes(+tagId)) {
                                    newStack = newStack.filter(v => v !== +tagId)
                                } else {
                                    newStack.push(+tagId)
                                }
                                setStack(newStack)
                            }}/>
                    )
                })
            }
        </>
    )
}