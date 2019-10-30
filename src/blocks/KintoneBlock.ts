export interface KintoneBlock {
    blockName: string;
    blockDefinition(): object;
    jsGenerator(): (block: any) => string;
    menuElement(): Element;
}
