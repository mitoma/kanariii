declare module '*.xml' {
    const content: string;
    export default content;
}

declare module '*.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare namespace KintoneBlockly {
    const sourceXml: string;
}

declare namespace cybozu.data.page.FORM_DATA.schema.table {
    const fieldList: object;
}
