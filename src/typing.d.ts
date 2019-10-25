declare module '*.xml' {
    const content: string;
    export default content;
}

declare module '*.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  