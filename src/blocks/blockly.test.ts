import * as Blockly from 'blockly';

test('test debuger block', () => {
  // @ts-ignore
  const xml = Blockly.Xml.textToDom(
    `<xml xmlns="https://developers.google.com/blockly/xml">
      <block type="text_print" id="Fg].;{n%bJ.mgRqVTm%@" x="468" y="131">
        <value name="TEXT">
          <shadow type="text" id="oU|Wh]6tlruH0mbleD9N">
            <field name="TEXT">hello</field>
          </shadow>
        </value>
      </block>
    </xml>`,
  );
  const workspace = new Blockly.Workspace();
  Blockly.Xml.domToWorkspace(xml, workspace);
  // @ts-ignore
  const code: string = Blockly.JavaScript.workspaceToCode(workspace);
  expect(code).toBe("window.alert('hello');\n");
});
