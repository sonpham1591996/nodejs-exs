export class Student {
  private name: string;
  private score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getScore() {
    return this.score;
  }

  setScore(score: number) {
    this.score = score;
  }
}
