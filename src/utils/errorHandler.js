const errorHandle = (res, error) => {
  return res
    .status(error.status || 500)
    .json({
      message: error.message || "Something gone wrong.",
      code: error.code || "Something gone wrong.",
    });
};
module.exports = errorHandle;
