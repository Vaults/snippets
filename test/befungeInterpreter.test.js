/**
 * Created by Marcel on 14-3-2017.
 */
import {interpret} from '../src/befungeInterpreter.js';
import assert from 'assert';

describe('Befunge', ()=>{
    it('hello world',()=> {
        assert.equal(interpret(`64+"!dlroW ,olleH">:#,_@`), 'Hello, World!\n');
    });
    it('quine', ()=>{
        assert.equal(interpret("01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@"),"01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@");

    });
});