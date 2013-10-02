var Lexer;
(function (Lexer) {
    function lex(source) {
        var lines = getLines(source);

        var lineNumber = 0;
        var result = [];
        var errors = [];

        while (lineNumber < lines.length) {
            var line = lines[lineNumber++];
            if (isValidLine(line))
                try  {
                    result.push(lexLine(line));
                } catch (ex) {
                    errors.push(new LexerLineException("Line " + lineNumber + ": " + ex.message));
                }
        }

        if (errors.length !== 0)
            throw new LexerException(errors);
        console.log(result);
        return result;
    }
    Lexer.lex = lex;

    function getLines(source) {
        if (!source)
            source = "";
        source += "\n";

        var lineRegExp = /[^\n]*\n/g;
        var match;
        var result = [];
        while ((match = lineRegExp.exec(source)) !== null) {
            result.push(match[0].trim());
        }

        return result;
    }

    function isValidLine(line) {
        var commentRegExp = /--.*/g;
        return line !== "" && !commentRegExp.test(line);
    }

    function lexLine(line) {
        var words = getWords(line);
        var opcode;
        var args = [];

        if (words.length > 0)
            opcode = words[0];
else
            throw new LexerLineException("Didn't find a valid instruction name");

        if (!Operations.contains(opcode))
            throw new LexerLineException("Instruction '" + opcode + "' not found");

        var operation = Operations.get(opcode);
        console.log(words);
        if (words.length < operation.getArgCount() + 1)
            throw new LexerLineException("Too few arguments provided, expected " + operation.getArgCount());
else if (words.length > operation.getArgCount() + 1)
            throw new LexerLineException("Too many arguments provided, expected " + operation.getArgCount());

        var wordIndex = 1;
        while (wordIndex < words.length) {
            var v = new NumberStackValue();
            if (!v.canParse(words[wordIndex]))
                throw new LexerLineException("Couldn't convert '" + words[wordIndex] + "' to number");
            v.parse(words[wordIndex]);
            args.push(v);
            wordIndex++;
        }

        return new Instruction(opcode, args);
    }

    function getWords(line) {
        if (!line)
            line = "";

        var wordRegExp = /[^\s]+/g;
        var match;
        var result = [];
        while ((match = wordRegExp.exec(line)) !== null) {
            result.push(match[0]);
        }

        return result;
    }
})(Lexer || (Lexer = {}));
