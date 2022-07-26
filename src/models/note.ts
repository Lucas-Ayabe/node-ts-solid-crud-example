export class Note {
  public constructor(public readonly id: number, private _title: string) {}

  get title(): string {
    return this._title;
  }

  rename(title: string) {
    this._title = title;
  }

  isEqualTo(otherNote: Note) {
    return this.id === otherNote.id;
  }

  toJSON() {
    return {
      id: this.id,
      title: this._title,
    };
  }
}
