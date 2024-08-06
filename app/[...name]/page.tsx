import BlogHome from "@/app/[...name]/_blogHome/page";
import BlogPost from "@/app/[...name]/_blogPost/page";

export default function Page({params}: {params: {name: string}}) {
    const blogName = params.name[0];
    const postSlug = decodeURIComponent(params.name[1]);

    if (blogName && !postSlug) {
        return (
            <>
                <BlogHome />
            </>
        )
    } else if (blogName && postSlug) {

        return (
            <>
                {/* @ts-expect-error Async Server Component */}
                <BlogPost params={'테스트'}/>
            </>
        )
    }
}