import SvgUndo from "@/components/svg/Undo";


interface NavHeaderProps {
    stack: number[]
    setStack: (newStack: number[]) => void
}

export default function NavHeader({stack, setStack}: NavHeaderProps) {
    return (
        <>
            <span>폴더</span>
            {
                stack.length > 1
                    ? (
                        <button onClick={() => {
                            const newStack = [...stack];
                            newStack.pop();
                            console.log(stack, newStack)
                            setStack(newStack);
                        }}>
                            <SvgUndo/>
                            <span>
                                            이전
                                        </span>
                        </button>
                    )
                    : null
            }
        </>
    )
}