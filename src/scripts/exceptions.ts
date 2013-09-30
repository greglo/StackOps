class LexerException {
    public name = "LexerException";
    constructor(public message:string) {}
}

class StackException {
    public name = "StackException";
    constructor(public message:string) {}
}

class NotHaltingException {
    public name = "NotHaltingException";
    public message = "The program has run too long, and may never halt";
}