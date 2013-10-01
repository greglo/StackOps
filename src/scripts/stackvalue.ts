interface StackValue<E> {
    getValue: () => E;
    setValue: (value: E) => void;
    canParse: (s: string) => boolean;
    parse: (s: string) => void; 
}

class NumberStackValue implements StackValue<number> {
    private value: number;
    
    constructor(value = 0) { this.value = value; }
    getValue() { return this.value; }
    setValue(value) { this.value = value; }
    canParse(s) { 
        var regexp = new RegExp('^[0-9]{1,9}$');
        return (regexp.test(s))
    }
    parse(s) {
        if (this.canParse(s))
            this.value = parseInt(s);
        else
            throw "Could not parse int";
    }
}