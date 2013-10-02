var LexerException = (function () {
    function LexerException(errors) {
        this.errors = errors;
        this.name = "LexerException";
        this.message = JSON.stringify(this.errors);
    }
    return LexerException;
})();

var LexerLineException = (function () {
    function LexerLineException(message) {
        this.message = message;
        this.name = "LexerLineException";
    }
    return LexerLineException;
})();

var StackException = (function () {
    function StackException(message) {
        this.message = message;
        this.name = "StackException";
    }
    return StackException;
})();

var NotHaltingException = (function () {
    function NotHaltingException() {
        this.name = "NotHaltingException";
        this.message = "The program has run too long, and may never halt";
    }
    return NotHaltingException;
})();
