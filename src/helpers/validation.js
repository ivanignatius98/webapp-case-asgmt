
export const validate = (value, rule, aliasParam) => {
  let conditionValidForm = true
  let errorMsg = ''
  value = value == undefined ? '' : value
  aliasParam = aliasParam == undefined ? 'Current field' : aliasParam
  const rules = rule.split('|')
  for (let indexRules = 0; indexRules < rules.length; indexRules += 1) {
    if (conditionValidForm) {
      const ruleName = rules[indexRules].indexOf(':') != -1 ? rules[indexRules].split(':')[0] : rules[indexRules]
      switch (ruleName) {
        case 'required':
          conditionValidForm = value !== null
          if (typeof value == 'string') {
            conditionValidForm = value.trim() !== ''
          }
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} is required`
          }
          break
        case 'number':
          conditionValidForm = regexList.number.test(value)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must be number`
          }
          break
        case 'datetime':
          conditionValidForm = validateDatetimeFormat(value)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must be a datetime`
          }
          break
        case 'date':
          value = typeof value != 'string' ? moment(value).format('YYYY-MM-DD') : value
          conditionValidForm = regexList.date.test(value)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must be a date`
          }
          break
        case 'time':
          value = typeof value != 'string' ? moment(value).format('HH:mm') : value
          conditionValidForm = regexList.time.test(value)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must be a time`
          }
          break
        case 'min-length':
          conditionValidForm = value.toString().replace(/<[^>]*>?/gm, '').length >= (typeof rules[indexRules].split(':')[1] !== 'undefined' ? parseInt(rules[indexRules].split(':')[1], 10) : 0)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must greater than ${typeof rules[indexRules].split(':')[1] !== 'undefined' ? parseInt(rules[indexRules].split(':')[1], 10) : 0}`
          }
          break
        case 'max-length':
          conditionValidForm = value.toString().replace(/<[^>]*>?/gm, '').length <= (typeof rules[indexRules].split(':')[1] !== 'undefined' ? parseInt(rules[indexRules].split(':')[1], 10) : 0)
          if (!conditionValidForm) {
            errorMsg = `${aliasParam} must less than ${typeof rules[indexRules].split(':')[1] !== 'undefined' ? parseInt(rules[indexRules].split(':')[1], 10) : 0}`
          }
          break
        default:
          break
      }
    }
  }
  return errorMsg
}