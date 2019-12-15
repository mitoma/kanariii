import * as TestHelper from '../TestHelper';

test('test text_print block', () => {
  const code: string = TestHelper.xmlToCode(`
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">hello</field>
          </shadow>
        </value>
      </block>`);
  expect(code).toBe(TestHelper.format(" window.alert('hello');"));
});
