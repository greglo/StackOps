var Operations;
(function (Operations) {
    function contains(name) {
        return this.get(name);
    }
    Operations.contains = contains;

    function get(name) {
        return (new OperationStore()).get(name);
    }
    Operations.get = get;

    var OperationStore = (function () {
        function OperationStore() {
            this.nameToOperation = {};
            this.nameToOperation["add"] = new AddOperation();
            this.nameToOperation["const"] = new ConstOperation();
        }
        OperationStore.prototype.get = function (name) {
            var operation = this.nameToOperation[name];
            if (operation)
                return operation;
else
                return null;
        };
        return OperationStore;
    })();

    var AddOperation = (function () {
        function AddOperation() {
        }
        AddOperation.prototype.execute = function (machine, args) {
            try  {
                var result = machine.getStack().pop().getValue() + machine.getStack().pop().getValue();
                machine.getStack().push(new NumberStackValue(result));
                return machine.nextProgramCounter();
            } catch (ex) {
                throw ex;
            }
        };
        AddOperation.prototype.getArgCount = function () {
            return 0;
        };
        return AddOperation;
    })();

    var ConstOperation = (function () {
        function ConstOperation() {
        }
        ConstOperation.prototype.execute = function (machine, args) {
            machine.getStack().push(args.pop());
            return machine.nextProgramCounter();
        };
        ConstOperation.prototype.getArgCount = function () {
            return 1;
        };
        return ConstOperation;
    })();
})(Operations || (Operations = {}));

var Instruction = (function () {
    function Instruction(opcode, args) {
        this.opcode = opcode;
        this.args = args;
    }
    return Instruction;
})();
