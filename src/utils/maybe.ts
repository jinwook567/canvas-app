/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
class Maybe {
  static just<T>(a: T) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable<T>(a: T): Nothing | Just<T> {
    return a === null || a === undefined ? Maybe.nothing() : Maybe.just(a);
  }

  static of<T>(a: T) {
    return Maybe.just(a);
  }

  get isNothing() {
    return false;
  }

  get isJust() {
    return false;
  }
}

class Just<T> extends Maybe {
  private val: T;

  constructor(val: T) {
    super();
    this.val = val;
  }

  get value() {
    return this.val;
  }

  map<P>(f: (val: T) => P) {
    return Maybe.fromNullable(f(this.val));
  }

  getOrElse() {
    return this.val;
  }

  filter<P>(f: (val: T) => P) {
    return Maybe.fromNullable(f(this.val) ? this.val : null);
  }

  chain<P>(f: (val: T) => P) {
    return f(this.val);
  }
}

class Nothing {
  map<T, P>(f: (arg: T) => P) {
    return this;
  }

  get value() {
    throw new TypeError('nothing은 값을 가져올 수 없습니다.');
  }

  getOrElse<T>(other: T) {
    return other;
  }

  filter<T, P>(f: (arg: T) => P) {
    return this;
  }

  chain<T, P>(f: (arg: T) => P) {
    return this;
  }
}

export default Maybe;
