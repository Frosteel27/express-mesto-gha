module.exports.cachingDecorator = (func) => {
  const cache = new Map();

  return async function (x) {
    if (cache.has(x)) {
      console.log('from cache');
      return cache.get(x);
    }
    const result = await func(x);
    cache.set(x, result);
    return result;
  };
};
