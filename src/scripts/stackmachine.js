var StackMachine = (function () {
    function StackMachine() {
        this.MAX_STACK_SIZE = 100;
        this.stack = new Stack(this.MAX_STACK_SIZE);
        this.MAX_INSTRUCTIONS = 5000;
        this.numInstructions = 0;
        this.programCounter = 0;
        this.instructions = [];
    }
    StackMachine.prototype.getStack = function () {
        return this.stack;
    };

    StackMachine.prototype.reset = function () {
        this.numInstructions = 0;
        this.programCounter = 0;
        this.stack = new Stack(this.MAX_STACK_SIZE);
    };

    StackMachine.prototype.loadInstructions = function (instructions) {
        this.reset();
        this.instructions = instructions;
    };

    StackMachine.prototype.isRunning = function () {
        return (this.programCounter < this.instructions.length);
    };

    StackMachine.prototype.nextProgramCounter = function () {
        return this.programCounter + 1;
    };

    StackMachine.prototype.executeAll = function () {
        while (this.isRunning() && this.numInstructions < this.MAX_INSTRUCTIONS)
            this.executeNext();

        if (this.isRunning())
            throw new NotHaltingException();
    };

    StackMachine.prototype.executeNext = function () {
        if (this.isRunning()) {
            var nextInstruction = this.instructions[this.programCounter];
            var op = Operations.get(nextInstruction.opcode);
            if (typeof op === "undefined" || op === null)
                throw new StackException("Invalid instruction passed to StackMachine");
            this.programCounter = op.execute(this, nextInstruction.args);
            this.numInstructions++;
        }
    };

    StackMachine.prototype.execute = function (instruction) {
        Operations.get(instruction.opcode).execute(this, instruction.args);
    };
    return StackMachine;
})();

var Stack = (function () {
    function Stack(maxSize) {
        this.data = [];
        this.maxSize = maxSize;
    }
    Stack.prototype.push = function (x) {
        if (this.data.length >= this.maxSize)
            throw new StackException("The stack is full");
else if (typeof x === "undefined" || x === null)
            throw new StackException("Cannot push undefined value to stack");
else
            this.data.push(x);
    };

    Stack.prototype.pop = function () {
        if (this.data.length < 1)
            throw new StackException("The stack is empty");
else
            return this.data.pop();
    };
    return Stack;
})();
