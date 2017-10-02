class Command {
  constructor(name, description, usage, parameterType) {
    this.name = name
    this.description = description
    this.usage = usage
    this.parameterType = parameterType
  }

  getName() {
    return this.name
  }

  getDescription() {
    return this.description
  }

  getUsage() {
    return this.usage
  }

  getParameterType() {
    return this.parameterType
  }
}

module.exports = Command
