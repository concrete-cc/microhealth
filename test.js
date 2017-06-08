const mockRes = require('jest-mock-express').response
const health = require('.')
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
    const passRes = mockRes()
    const failRes = mockRes()

    health.register(passingCheck)
    health.route(jest.fn(), passRes)
    .then(() => {
      expect(passRes.status).toHaveBeenCalledWith(200)
      expect(passRes.send).toHaveBeenCalled()
    })

    health.register(failingCheck)
    return health.route(jest.fn(), failRes)
    .then(() => {
      expect(failRes.status).toHaveBeenCalledWith(500)
      expect(failRes.send).toHaveBeenCalled()
    })
  })
  it('should return list of checks', () => {
    const initialCount = health.getChecks().length
    health.register(passingCheck)
    health.register(passingCheck)
    expect(health.getChecks()).toHaveLength(initialCount + 2)
  })
  it('should return reset checks', () => {
    const initialCount = health.getChecks().length
    health.register(passingCheck)
    health.register(passingCheck)
    health.reset()
    expect(health.getChecks()).toHaveLength(initialCount)
  })
})
