var Lexer;
(function (Lexer) {
    function lex(source) {
        if (typeof source === undefined || source === null)
            source = "";

        var lineRegexp = new RegExp("[^\n]+", "g");
        var match;
        var lineNumber = 1;
        var result = [];
        while ((match = lineRegexp.exec(source)) !== null) {
            var line = match[0].trim();
            console.log(line);
            result.push(lexLine(line));
            lineNumber++;
        }
        return result;
    }
    Lexer.lex = lex;

    function lexLine(line) {
        var wordRE = new RegExp("[^\\s]+", "g");
        var match;
        var opcode;
        var args = [];

        if ((match = wordRE.exec(line)) !== null) {
            opcode = match[0];
            console.log("Found opcode = " + opcode);
        }
        var wordNumber = 0;
        while ((match = wordRE.exec(line)) !== null && wordNumber < 10) {
            var v = new NumberStackValue(0);
            v.parse(match[0]);
            args.push(v);
            wordNumber++;
        }

        return new Instruction(opcode, args);
    }

    function lexCleanList(lines) {
        var line = lines[0];
        var opcode = line[0];
        var op = Operations.get(opcode);
        var args = [];
        var val = new NumberStackValue(0);
        val.parse(line[1]);
        args.push(val);
        return new Instruction(opcode, args);
    }
    Lexer.lexCleanList = lexCleanList;
})(Lexer || (Lexer = {}));
