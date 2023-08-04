class DateUtills {
    static leftPad(value) {
        if(value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    static toStringByFormatting(date) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1); // js에서 month는 index로되어있어 1월이 0으로 나옴
        const day = this.leftPad(date.getDate());

        return [year, month, day].join("-");
    }
}














