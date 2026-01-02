const AsyncHandler = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};

export default AsyncHandler;
