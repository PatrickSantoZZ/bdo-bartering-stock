'use strict';

class BarterItem
{
    //#region  grades
    static get GRADES()
    {
        return {
            WHITE: 0,
            GREEN: 1,
            BLUE: 2,
            YELLOW: 3,
            ORANGE: 4
        };
    }
    //#endregion

    /**
     * @param {string} id
     * @param {string} name
     * @param {BarterItem.GRADES} grade
     * @param {boolean} stackable
     * @param {Number} count
     */
    constructor(id, name, grade = this.GRADES.WHITE, stackable = true, count = 0)
    {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.stackable = stackable;
        this.count = count;
    }
}

export { BarterItem as default };
