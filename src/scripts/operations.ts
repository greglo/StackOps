module Operations {
    export function contains(name: string): boolean {
        return this.get(name)
    }

    export function get(name: string): Operation {
        return (new OperationStore()).get(name);
    }
 
    class OperationStore {
        nameToOperation: { [name: string]: Operation; } = {};
 
        constructor() {
            this.nameToOperation["add"] = new AddOperation();
            this.nameToOperation["const"] = new ConstOperation();
        }
 
        get(name: string) : Operation {
            var operation = this.nameToOperation[name];
            if (operation)
                return operation;
            else
                return null;
        }
    }
 
    class AddOperation implements Operation {
        execute(machine: StackMachine, args: StackValue<any>[]) {
            try {
                var result = machine.getStack().pop().getValue() + machine.getStack().pop().getValue();
                machine.getStack().push(new NumberStackValue(result));
                return machine.nextProgramCounter();
            }
            catch (ex) {
                throw ex;
            }
        }
        getArgCount() { return 0; }
    }
 
    class ConstOperation implements Operation {
        execute(machine: StackMachine, args: StackValue<any>[]) {
            machine.getStack().push(args.pop());
            return machine.nextProgramCounter();
        }
        getArgCount() { return 1; }
    }
 
    export interface Operation {
        execute: (machine: StackMachine, args: StackValue<any>[]) => number;
        getArgCount: () => number;
    }
}

class Instruction {
    constructor(public opcode: string, public args: StackValue<any>[]) {}
}