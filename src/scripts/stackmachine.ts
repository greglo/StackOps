class StackMachine {
    private MAX_STACK_SIZE = 100;
    private stack = new Stack(this.MAX_STACK_SIZE);

    private MAX_INSTRUCTIONS = 5000;
    private numInstructions = 0;
    
    private programCounter = 0;
    private instructions: Instruction[] = [];
    
    getStack() { return this.stack }
    
    reset() {
        this.numInstructions = 0; 
        this.programCounter = 0;
        this.stack = new Stack(this.MAX_STACK_SIZE);
    }
    
    loadInstructions(instructions: Instruction[]) {
        this.reset();
        this.instructions = instructions;
    }
    
    isRunning() {
        return (this.programCounter < this.instructions.length); 
    }
    
    nextProgramCounter() { return this.programCounter + 1 }
    
    executeAll() {
        while (this.isRunning() && this.numInstructions < this.MAX_INSTRUCTIONS)
            this.executeNext();
            
        if (this.isRunning())
            throw new NotHaltingException();
    }
    
    executeNext() {
        if (this.isRunning()) {
            var nextInstruction = this.instructions[this.programCounter];
            var op = Operations.get(nextInstruction.opcode);
            if (typeof op === "undefined" || op === null)
                throw new StackException("Invalid instruction passed to StackMachine");
            this.programCounter = op.execute(this, nextInstruction.args);
            this.numInstructions++;
        }
    }
     
    execute(instruction: Instruction) {
        Operations.get(instruction.opcode).execute(this, instruction.args);
    }
}

class Stack {
    private maxSize;
    private data: StackValue<any>[] = [];
    
    constructor(maxSize: number) {
        this.maxSize = maxSize; 
    }
    
    push(x: StackValue<any>) {
        if (this.data.length >= this.maxSize)
            throw new StackException("The stack is full");
        else if (typeof x === "undefined" || x === null)
            throw new StackException("Cannot push undefined value to stack");
        else
            this.data.push(x);
    }
    
    pop() {
        if (this.data.length < 1)
            throw new StackException("The stack is empty");
        else
            return this.data.pop();
    }
}