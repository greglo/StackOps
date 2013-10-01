module Lexer {
    export function lex(source: string): Instruction[] {
        if (typeof source === undefined || source === null)
            source = "";
        
        var lineRegexp = new RegExp("[^\n]+", "g");
        var match;
        var lineNumber = 1;
        var result: Instruction[] = [];
        while ((match = lineRegexp.exec(source)) !== null) {
            var line = match[0].trim();
            try {
                result.push(lexLine(line));
            //} catch (ex if ex instanceof LexerException) {
            } catch (ex) { 
                throw new LexerException("Line " + lineNumber + ": " + ex.message);
            }
            lineNumber++;
        }
        return result;
    }
     
    function lexLine(line: string): Instruction {
        var wordRE = new RegExp("[^\\s]+", "g");
        var match;
        var opcode;
        var args:StackValue<any>[] = [];
         
        if ((match = wordRE.exec(line)) !== null)
            opcode = match[0];
        else
            throw new LexerException("Invalid instruction name");
            
        while ((match = wordRE.exec(line)) !== null) {
            var v = new NumberStackValue();
            v.parse(match[0]);
            args.push(v);
        }
        
        if (Operations.contains(opcode))
            return new Instruction(opcode, args);
        else
            throw new LexerException("Instruction '" + opcode + "' not found");
    }
     
    export function lexCleanList(lines: string[][]) {
    var line = lines[0];
    var opcode = line[0];
    var op = Operations.get(opcode);
    var args: StackValue<any>[] = []
    var val = new NumberStackValue();
    val.parse(line[1])
    args.push(val);
    return new Instruction(opcode, args);
    }
}