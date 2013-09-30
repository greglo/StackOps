var NumberStackValue = (function () {
    function NumberStackValue(value) {
        this.value = 1;
        this.value = value;
    }
    NumberStackValue.prototype.getValue = function () {
        return this.value;
    };
    NumberStackValue.prototype.setValue = function (value) {
        this.value = value;
    };
    NumberStackValue.prototype.canParse = function (s) {
        var regexp = new RegExp('^[0-9]{1,9}$');
        return (regexp.test(s));
    };
    NumberStackValue.prototype.parse = function (s) {
        if (this.canParse(s))
            this.value = parseInt(s);
else
            alert("Couldnt parse int");
    };
    return NumberStackValue;
})();
