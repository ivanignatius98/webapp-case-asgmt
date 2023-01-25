import { useMemo, useEffect, useState } from 'react'
import ReactDataTable, { createTheme } from 'react-data-table-component';
import { get } from "@/services/api";
import TextInput from '@/modules/inputs/TextInput'
import { useRouter } from 'next/router'
import { getToken } from '@/services/account';

const FilterComponent = ({ onFilter, onSubmit, filterText, onClear, postButton, showFilter, searchBar = true }) => {
  const router = useRouter()
  const buttonClass = "inline-block rounded-lg px-4 py-1 text-sm leading-7 shadow-sm focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
  return (
    <div className="md:flex w-full ">
      <div className="md:flex-1">
        <div className="px-4 sm:px-0 py-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Book</h3>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed on the main page.
          </p>
        </div>
      </div>
      <div className="mt-5 md:flex-2 md:flex md:mt-0 items-end">
        <div className='md:flex justify-between px-4 md:px-0'>
          <div className=" mb-2 md:mb-0 w-full">
            <TextInput
              noMargin={true}
              name="title"
              value={filterText}
              onChange={onFilter}
              placeholder="Search Keyword..."
            />
          </div>
          <div className="ml-2 flex justify-end">
            <button
              className={"my-2 mx-2 bg-white text-sm font-medium hover:bg-gray-100 hover:text-blue-700 text-gray-900  border border-gray-200 " + buttonClass}
              type="button"
              onClick={onSubmit}
            >
              Search
            </button>
            <button
              className={"my-2 mr-1 bg-white text-sm font-medium hover:bg-gray-100 hover:text-blue-700 text-gray-900  border border-gray-200 " + buttonClass}
              type="button"
              onClick={onClear}
            >
              Reset
            </button>
            <div className={"pl-4 ml-4" + (searchBar ? " border-l-2 border-gray-300" : "")}>
              <button
                className={"my-2 ml-1 bg-indigo-600 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 text-white font-semibold " + buttonClass}
                onClick={() => { router.push(postButton) }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const DataTable = ({ columns, url, additionalFilter = "", refresh, showFilter = true, postButton, searchBar = true }) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);


  const fetchData = async (page, reset, newPerPage) => {
    if (!loading || reset) {
      setLoading(true)
      const limit = newPerPage || perPage
      const keywordParam = showFilter && !reset ? `&keyword=${filterText}` : ""
      const { data, status } = await get(`${url}?page=${page}&limit=${limit}${keywordParam}${additionalFilter}`, { token: getToken() })
      if (status == 200) {
        setData(data.records)
        setTotalRows(data.count)
      }
      setLoading(false)
    }
  };

  const handlePageChange = page => {
    fetchData(page)
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchData(page, false, newPerPage)
    setPerPage(newPerPage)
  };

  // useEffect(() => {
  //   fetchData(1)
  // }, [])
  useEffect(() => {
    fetchData(1, true)
  }, [refresh])

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
        setResetPaginationToggle(!resetPaginationToggle);
        fetchData(1, true)
      }
    };
    const handleFilter = () => {
      fetchData(1)
    };
    return (
      showFilter ? <FilterComponent
        onSubmit={handleFilter}
        onFilter={({ target }) => { setFilterText(target.value) }}
        onClear={handleClear}
        postButton={postButton}
        searchBar={searchBar}
        filterText={filterText} /> :
        <></>
    );
  }, [filterText, resetPaginationToggle]);


  return (
    <>
      {subHeaderComponentMemo}
      <div className='rounded-lg bg-white'>
        <div className='m-1'>
          <ReactDataTable
            paginationResetDefaultPage={resetPaginationToggle}
            columns={columns}
            data={data}
            progressPending={loading}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
export default DataTable