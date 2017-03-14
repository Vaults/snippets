/**
 * Created by Marcel on 11-3-2017.
 */
function interpret(code) {
    code = code.split('\n').map(o=>o.split(''));
    var xMax = Math.max.apply(null, code.map(o=>o.length));
    var yMax = code.length;
    var stack = [];
    var pointer = {x:0,y:0};
    var output = '';
    var strMode = false;
    var dirs = {
        'L':{x:-1, y:0},
        'R':{x:1, y:0},
        'U':{x:0, y:-1},
        'D':{x:0, y:1},
    }
    var dir = dirs['R'];
    while(code[pointer.y][pointer.x] != '@'){
        var p = code[pointer.y][pointer.x];
        var move = () => {
            pointer.x = (pointer.x + dir.x) % xMax;
            pointer.y = (pointer.y + dir.y) % yMax;
        }

        if(strMode){
            if(p != '"'){
                stack.push(p.charCodeAt(0));
            }else{
                strMode = false;
            }
        }
        else{
            if(p.match(/[0-9]/g)){stack.push(p);}
            if(p == '+'){stack.push(+(stack.pop() || 0) + +(stack.pop() || 0));}
            if(p == '-'){stack.push(-(stack.pop() || 0) + +(stack.pop() || 0));}
            if(p == '*'){stack.push(+(stack.pop() || 0) * +(stack.pop() || 0));}
            if(p == '/'){a=stack.pop(); if(a==0){stack.push(0);}else{stack.push(~~(stack.pop()/a))}}
            if(p == '%'){a=stack.pop(); if(a==0){stack.push(0);}else{stack.push(stack.pop() % a);}}
            if(p == '!'){if(stack.length > 0){stack.push((stack.pop() == 0)?1:0)}}
            if(p == '`'){stack.push((stack.pop() < stack.pop())?1:0);}
            if(p == '>'){dir = dirs['R']}
            if(p == '<'){dir = dirs['L']}
            if(p == '^'){dir = dirs['U']}
            if(p == 'v'){dir = dirs['D']}
            if(p == '?'){dir = dirs[['R','L','U','D'][~~(Math.random()*4)]]} //rng: return 4;
            if(p == '_'){dir = dirs[(stack.pop() == 0)?'R':'L']}
            if(p == '|'){dir = dirs[(stack.pop() == 0)?'D':'U']}
            if(p == '"'){strMode = true;}
            if(p == ":"){if(stack.length == 0){stack.push(0);}else{var t = stack.pop(); stack.push(t); stack.push(t);}}
            if(p == '\\'){if(stack.length == 1){stack.unshift(0);} stack=stack.concat([stack.pop(),stack.pop()]);}
            if(p == "$"){stack.pop();}
            if(p == "."){output += stack.pop();}
            if(p == ","){output += String.fromCharCode(stack.pop());}
            if(p == "#"){move();}
            if(p == 'a'){stack.push(10)}
            if(p == "p"){code[stack.pop()][stack.pop()] = String.fromCharCode(stack.pop()); }
            if(p == "g"){stack.push(code[stack.pop()][stack.pop()].charCodeAt(0))}
        }
        move();
    }
    return output;
}
export {interpret}