const trimInput = (input: any[]): boolean => {
    const check = input.map((el) => {
        if (el) if (el.trim()) return true;
        return false;
    });
    return !check.includes(false);
};
export default trimInput;
