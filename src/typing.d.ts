declare module '*.xml' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare namespace KintoneBlockly {
  interface Revision {
    revisionId: number;
    deployDate: Date;
    source: string;
    message: string;
  }
  const sourceXml: string;
  const revisions: Revision[];
  const mediaUrl: string;
}
