export const schema: {
    group: string
    components: {
        name: string
        code: string
        style: Partial<CSSStyleDeclaration>
        props: Record<string, any>
        drop: boolean
        [x: string]: any
    }[]
}[] = [
    {
        group: "布局",
        components: [
            {
                name: "布局容器",
                code: "div",
                text: "拖拽组件到这里",
                props: {},
                drop: true,
                style: {
                    width: "100%",
                    minHeight: "60px",
                    fontSize: "12px",
                    color: "rgba(162,163,165,1)",
                    backgroundColor: "#f0f0f0",
                    textAlign: "center",
                    lineHeight: "60px",
                    cursor:'pointer',
                    border: '1px dotted'
                },
            },
        ],
    },
    {
        group: "元素",
        components: [
            {
                name: "文本",
                code: "span",
                drop: false,
                props: {
                    value: "默认文本",
                },
                style: {},
            },
            {
                name: "图片",
                code: "img",
                drop: false,
                props: {
                    src: "https://pkpmsoft.oss-cn-beijing.aliyuncs.com/PKPMCN/PKPMCNPIC/NEWSSHOW/20231011/640_1697005490001.png",
                },
                style: {
                    width: "500px",
                    height: "300px",
                },
            },
            {
                name: "图标",
                drop: false,
                code: "img",
                props: {
                    src: "",
                },
                style: {},
            },
        ],
    },
]
