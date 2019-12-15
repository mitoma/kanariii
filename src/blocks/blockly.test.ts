import * as TestHelper from '../TestHelper';
import { loadEnLocale } from '../msg/all';

describe('blockly default block', () => {
  test('test text_print block', () => {
    const code: string = TestHelper.xmlToCode(`
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">hello</field>
          </shadow>
        </value>
      </block>`);
    expect(code).toBe(TestHelper.format("window.alert('hello')"));
  });
});

describe('debug block', () => {
  beforeEach(() => {
    loadEnLocale();
    TestHelper.loadKintoneBlocks();
  });

  test('test debugger block', () => {
    const code: string = TestHelper.xmlToCode(
      `<block type="debugger"></block>`,
    );
    expect(code).toBe(TestHelper.format('debugger'));
  });

  test('test console block', () => {
    const code: string = TestHelper.xmlToCode(`
      <block type="console_log">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">debug message</field>
          </shadow>
        </value>
      </block>`);
    expect(code).toBe(TestHelper.format('console.log("debug message")'));
  });
});

describe('event block', () => {
  beforeEach(() => {
    loadEnLocale();
    TestHelper.loadKintoneBlocks();
  });

  test('kintone_event_app_record_index block', () => {
    const code: string = TestHelper.xmlToCode(`
      <block type="kintone_event_app_record_create">
        <field name="event_type">app.record.create.show</field>
        <statement name="event_callback">
          <block type="console_log">
            <value name="TEXT">
              <shadow type="text">
                <field name="TEXT">debug message</field>
              </shadow>
            </value>
          </block>
        </statement>
      </block>`);
    expect(code).toBe(
      TestHelper.format(`
        kintone.events.on("app.record.create.show", function(event) {
          console.log("debug message");
          return event;
        });
    `),
    );
  });
});
