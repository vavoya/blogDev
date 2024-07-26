import Link from "next/link";


export default function Page({path, name, folder, onClick}: {
    path: string,
    name: string,
    folder: boolean,
    onClick?: (index: number) => void
}) {
    const pageQueryString: string = folder ? "" : "?page=1";

    return (
        <Link
            href={path+'/'+name + pageQueryString}
            onClick={onClick}>
            <span>
                {name}
            </span>
        </Link>
    )
}