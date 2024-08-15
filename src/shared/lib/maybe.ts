class Maybe {
  static just<T>(a: NonNullable<T>) {
    return new Just(a);
  }

  static nothing() {
    return new Nothing();
  }

  static fromNullable<T>(a: T): Nothing | Just<T> {
    return a === null || a === undefined ? Maybe.nothing() : Maybe.just(a);
  }
}

class Just<T> extends Maybe {
  private val: NonNullable<T>;

  constructor(val: NonNullable<T>) {
    super();
    this.val = val;
  }

  get value() {
    return this.val;
  }

  map<P>(f: (val: NonNullable<T>) => P) {
    return Maybe.fromNullable(f(this.val));
  }

  getOrElse() {
    return this.val;
  }

  filter<P>(f: (val: NonNullable<T>) => P) {
    return Maybe.fromNullable(f(this.val) ? this.val : null);
  }

  chain<P>(f: (val: NonNullable<T>) => P) {
    return f(this.val);
  }
}

class Nothing {
  map() {
    return this;
  }

  get value() {
    throw new TypeError('nothing은 값을 가져올 수 없습니다.');
  }

  getOrElse<T>(other: T) {
    return other;
  }

  filter() {
    return this;
  }

  chain() {
    return this;
  }
}

export default Maybe;
