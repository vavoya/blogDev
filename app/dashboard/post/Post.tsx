'use client'

import Layout from "@/app/dashboard/common/Layout";
import TreeItem from "@/app/dashboard/common/TreeItem";
import SvgAdd from "@/components/svg/Add";
import InputFieldWithLabel from "@/app/dashboard/common/InputFieldWithLabel";
import Button from "@/app/dashboard/common/Button";
import SvgFolder from "@/components/svg/Folder";
import {Directories} from "@/types/directories.interface";



export default function Post({data}: {data: Directories}) {

    const treeElements = [
        <TreeItem svgElement={<SvgFolder strokeWidth={'2'}/>} key={0} itemName={'~'} level={0}>
            <SvgAdd strokeWidth={'2'}/>
        </TreeItem>,
        <TreeItem svgElement={<SvgFolder strokeWidth={'2'}/>} key={1} itemName={'FrontEnd'} level={1}>
            <SvgAdd strokeWidth={'2'}/>
        </TreeItem>,
        <TreeItem svgElement={<SvgFolder strokeWidth={'2'}/>} key={2} itemName={'NextJS'} level={2}>
            <SvgAdd strokeWidth={'2'}/>
        </TreeItem>,
        <TreeItem svgElement={<SvgFolder strokeWidth={'2'}/>} key={3} itemName={'BackEnd'} level={1}>
            <SvgAdd strokeWidth={'2'}/>
        </TreeItem>
    ]

    const detailsContainer = [
        <InputFieldWithLabel
            key={0}
            labelText={"경로"}
            value={"~/FrontEnd/NextJS"}
            readOnly={true}/>,
        <InputFieldWithLabel
            key={1}
            labelText={"폴더 명"}
            onChange={(e) => {

            }}/>,
        <Button key={2} text={"삭제"} />,
        <Button key={3} text={"변경"} />
    ]



    return (
        <Layout treeElements={treeElements} detailsElements={detailsContainer} />
    )
}

