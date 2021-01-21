class MetaCache {
  constructor(keepDuration) {
    this.cache = [];
    this.keepDuration = keepDuration;
    this.startTime = 0;
  }

  hasCache() {
    return (
      Date.now() < this.startTime + this.keepDuration && this.cache.length > 0
    );
  }

  save(metaDatas) {
    this.cache = metaDatas;
    this.startTime = Date.now();
  }

  getAll() {
    return this.cache;
  }
}

export const cache = new MetaCache(60 * 30 * 1000);
