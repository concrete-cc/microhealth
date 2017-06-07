const health = require('./health')
const passingCheck = () => new Promise((resolve, reject) => resolve())
const failingCheck = () => new Promise((resolve, reject) => reject())

describe('Health check', () => {
  beforeEach(() => {
    health.reset()
  })
  it('should register checks', () => {
    health.register(passingCheck)
    return expect(health.getChecks().pop()).toBe(passingCheck)
  })
  it('should resolve if all checks pass', () => {
    health.register(passingCheck)
    health.register(passingCheck)
    return expect(health.check()).resolves.toBeTruthy()
  })
  it('should reject if a check fails', () => {
    health.register(passingCheck)
    health.register(failingCheck)
    return expect(health.check()).rejects.toBeUndefined()
  })
  it('should respond to connect/express request correctly', () => {
    health.register(passingCheck)
    // todo health.route() works correctly
  })
})
