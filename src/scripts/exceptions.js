var LexerException = (function () {
    function LexerException(message) {
        this.message = message;
        this.name = "LexerException";
    }
    return LexerException;
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
