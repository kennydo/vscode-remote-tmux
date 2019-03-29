import * as assert from 'assert';

import {isSafeSshHost, isSafeTmuxSessionName} from '../stringUtils';


suite("stringUtils", function () {
    test("isSafeSshHost supports IPv6", function() {
        assert.strictEqual(isSafeSshHost("fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"), true);
        assert.strictEqual(isSafeSshHost("fc00::"), true);
    });

    test("isSafeSshHost supports domains", function() {
        assert.strictEqual(isSafeSshHost("foo.example.com"), true);
    });

    test("isSafeSshHost requires non-empty string", function() {
        assert.strictEqual(isSafeSshHost(""), false);
    });

    test("isSafeTmuxSessionName requires non-empty string", function() {
        assert.strictEqual(isSafeTmuxSessionName(""), false);
    });

    test("isSafeTmuxSessionName has banned characters", function() {
        assert.strictEqual(isSafeTmuxSessionName("foo.bar"), false);
        assert.strictEqual(isSafeTmuxSessionName("foo:bar"), false);
    });

    test("isSafeTmuxSessionName supports simple strings", function() {
        assert.strictEqual(isSafeTmuxSessionName("foobar"), true);
        assert.strictEqual(isSafeTmuxSessionName("foo-bar"), true);
        assert.strictEqual(isSafeTmuxSessionName("foo_bar"), true);
    });
});
