class Command {
  constructor (name, description, usage, parameterTypes, provider = 'vokkit') {
    this.name = name
    this.description = description
    this.usage = usage
    this.parameterTypes = parameterTypes
    this.provider = provider
  }

  getName () {
    return this.name
  }

  getDescription () {
    return this.description
  }

  getUsage () {
    return this.usage
  }

  getParameterTypes () {
    return this.parameterTypes
  }

  getProvider () {
    return this.provider
  }
}

module.exports = Command
