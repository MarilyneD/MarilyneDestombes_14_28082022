import React, { useEffect, useMemo, useReducer, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from '../data/makeData.ts'
import { useSelector } from 'react-redux'




function Table() {
    const rerender = useReducer(() => ({}), {})[1]

    const [sorting, setSorting] = useState<SortingState>([])
  
  
    const columns = useMemo<ColumnDef<Person>[]>(
      () => [
        {
          header: 'Name',
          footer: props => props.column.id,
          columns: [
            {
              accessorKey: 'firstName',
              header: () => 'First Name',
              footer: props => props.column.id,
            },
            {accessorKey: 'lastName',
            header: () => 'Last Name',
            footer: props => props.column.id,
            },
          ],
        },
        {
          header: 'Info',
          footer: props => props.column.id,
          columns: [
            {
              accessorKey: 'startDate',
              header: () => 'Start Date',
              footer: props => props.column.id,
            },
            
                {
                  accessorKey: 'department',
                  header: () => 'Department',
                  footer: props => props.column.id,
                },
                {
                  accessorKey: 'dateOfBirth',
                  header: 'Date of Birth',
                  footer: props => props.column.id,
                },
                {
                  accessorKey: 'street',
                  header: 'Street',
                  footer: props => props.column.id,
                },
                {
                  accessorKey: 'city',
                  header: 'City',
                  footer: props => props.column.id,
                },{
                  accessorKey: 'state',
                  header: 'State',
                  footer: props => props.column.id,
                },
             
            {
              accessorKey: 'zipCode',
              header: 'Zip Code',
            },
          ],
        },
      ],
      []
    )
    const globalStore = useSelector(state => state.employees)
    const [data, setData] = useState(globalStore.employeesList)
    
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    })


  
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [startingRow, setStartingRow] = useState(0);
    const [endingRow, setEndingRow] = useState(startingRow+numberOfRows);
  //   if (startingRow <0) {setStartingRow(0)};
  // if (endingRow > table.getRowModel().rows.length ) {setEndingRow(table.getRowModel().rows.length) }
    

    useEffect(() => {
      if (startingRow <0) {setStartingRow(0)};
      if (endingRow > table.getRowModel().rows.length ) {setEndingRow(table.getRowModel().rows.length) }
      
  }, [setStartingRow,setEndingRow]);




  const previousFunction = () => {
    if (startingRow - numberOfRows < 0) {
      setStartingRow(0);
    } else {
      setStartingRow(startingRow - numberOfRows);
    }
    if (!(endingRow - numberOfRows <= 0)) {
      setEndingRow(endingRow - numberOfRows);
    }
    
  };


  const nextFunction = () => {
    if (!(startingRow + numberOfRows >= table.getRowModel().rows.length)) {setStartingRow(startingRow + numberOfRows);}
    if (endingRow + numberOfRows > table.getRowModel().rows.length) {
      setEndingRow(table.getRowModel().rows.length);
    } else {
      setEndingRow(endingRow + numberOfRows);
    }
  };


  
    return (
      <div className="p-2">
        <div className="h-2" />
        <div className="table-header">
          <div className="show-select-menu">
            Show
            <select
              className="show-select-menu-button"
              value={numberOfRows}
              onChange={(e) => {
                {
                  setStartingRow(0);
                  setNumberOfRows(Number(e.target.value));
                  setEndingRow(Number(e.target.value));
                }
              }}
            >
              {[20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            entries
          </div>

          <div className="search-menu">
            search : <input />
          </div>
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(startingRow, endingRow)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="table-footer">
          <div className="prev-next">
            <button onClick={() => previousFunction()}>
              Previous {numberOfRows} Rows
            </button>
          </div>
          <div className="showing">
            {" "}
            Showing {startingRow} to {endingRow} of{" "}
            {table.getRowModel().rows.length} entries
          </div>

          <div className="prev-next">
            <button onClick={() => nextFunction()}>
              Next {numberOfRows} Rows
            </button>
          </div>

          {/* <div> startingRow = {startingRow}, endingRow = {endingRow}, number of rows = {numberOfRows}</div> */}
        </div>
        {/* <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
      </div>
    );
  }
  



const TanstackMockedTable = () => {
   
    return (
        <div>
            <Table />
        </div>
    );
};

export default TanstackMockedTable;