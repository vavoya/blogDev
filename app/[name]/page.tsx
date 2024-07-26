import ProfileSection from "@/app/[name]/ProfileSection";
import ReadMe from "@/app/[name]/PostContent";

export default function BlogHome({params}: {params: string}) {
    console.log(params)
    // 여기서 모든 기본 fetch 동작? 아니면 하위?



    return (
        <>
            <ProfileSection params={null} />
            <ReadMe />
        </>
    )
}