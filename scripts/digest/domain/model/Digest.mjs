/**
 * Aggregate Root: 1日分のダイジェスト。
 */
export class Digest {
    /**
     * @param {string} date  YYYY-MM-DD
     * @param {import('./DigestItem.mjs').DigestItem[]} items
     */
    constructor(date, items = []) {
        this.date = date;
        this.items = [...items];
        Object.freeze(this);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    toJSON() {
        return {
            date: this.date,
            items: this.items.map((item) => item.toJSON()),
        };
    }
}
