import { AsyncPaginate } from "react-select-async-paginate"
import { get } from "@/services/api";
import { getToken } from '@/services/account';

const generalStyling = {
  menu: (styles) => ({
    ...styles,
    zIndex: 3,
  }),
  control: styles => ({
    ...styles,
    color: "lime",
    borderRadius: 4
  }),
  input: (styles) => {
    return {
      ...styles,
      marginLeft: -5,
    }
  },
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: isDisabled ? '#999' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default'
    }
  },

}
const SelectAsyncPaginate = props => {
  async function loadOptions(search, loadedOptions) {
    const page = (loadedOptions.length / props.limit) + 1
    let getUrl = `${props.url}?limit=${props.limit}&page=${page}&keyword=${search}`
    for (let { key, value } of props.additionalFilters) {
      getUrl += `&${key}=${value}`
    }
    const { status, data } = await get(getUrl, { token: getToken() })
    let res = {
      options: [],
      hasMore: false
    }
    if (status == 200) {
      let options = []
      if (props.allowNull && page == 1) {
        options.push({ value: '', label: "Allow All" })
      }

      const records = data.records
      options = [...options, ...records]
      options.map((row) => {
        row.isDisabled = row.disabled == "Y"
      })

      res = {
        options,
        hasMore: records.length >= props.limit
      }
    }
    return res
  }

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {props.label}
      </label>
      <AsyncPaginate
        value={props.value}
        className={props.className}
        name={props.name}
        hidden={props.hidden}
        placeholder={props.placeholder}
        loadOptions={loadOptions}
        onChange={(option, action) => {
          props.onChange({ target: { name: props.name, value: option } })
        }}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isMulti={props.multi}
        allowNull={props.allowNull}
        instanceId="select-custom"
        styles={generalStyling}
      />
    </>
  )

}

SelectAsyncPaginate.defaultProps = {
  onChange: () => { },
  limit: 20,
  additionalFilters: []
}

export default SelectAsyncPaginate