import Link from "next/link";


export default function Page({path}: {path: string}) {

    return (
        <Link href={path}>
            <span>
                FrontEnd
            </span>
        </Link>
    )
}