let checks = []

function reset() {
  checks = []
}
function getChecks() {
  return checks
}
function register(cb) {
  checks.push(cb)
}
function check() {
  return Promise.all(checks.map(cb => cb()))
}
function route(req, res) {
  return check()
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send())
}

module.exports = {
  reset,
  getChecks,
  register,
  check,
  route,
}
