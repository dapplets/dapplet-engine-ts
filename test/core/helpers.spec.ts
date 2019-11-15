import 'mocha';
import { assert } from "chai";
import { DappletExecutable } from "../../src/core/dappletExecutable";
import { DappletTemplate } from '../../src/types/dappletTemplate';

describe('// ---------------- @dapplets/dapplet-engine-ts --------------- //', () => {
  it('aliases replacement', async () => {
    const input: DappletTemplate = {
      aliases: {
        "@baseUrl": "http://dapplet.org",
        "@baseUrl2": "@baseUrl/first",
        "first": "@baseUrl/first",
        "second": "@baseUrl2/second"
      },
      variables: {},
      views: [],
      transactions: {}
    };

    const de = new DappletExecutable(input);

    const expected = new Map<string, string>();
    expected.set("@baseUrl", "http://dapplet.org");
    expected.set("@baseUrl2", "http://dapplet.org/first");
    expected.set("first", "http://dapplet.org/first");
    expected.set("second", "http://dapplet.org/first/second");

    assert.deepEqual(de.aliases, expected);
  })
})