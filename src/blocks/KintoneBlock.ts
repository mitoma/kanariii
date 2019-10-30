export interface KintoneBlock {
    blockName: string;
    blockDefinition(): object;
    jsGenerator(): (block: any) => any;
    menuElement(): Element;
}
