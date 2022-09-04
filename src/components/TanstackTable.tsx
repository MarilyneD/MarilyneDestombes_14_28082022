import React, { useMemo, useReducer, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData.ts'




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
  
    const [data, setData] = useState(() => makeData(20))
    const refreshData = () => setData(() => makeData(20))
  
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
  
    return (
      <div className="p-2">
        <div className="h-2" />
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 30)
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => rerender()}>Force Rerender</button>
        </div>
        <div>
          <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
        <pre>{JSON.stringify(sorting, null, 2)}</pre>
      </div>
    )
  }
  



const TanstackTable = () => {
   
    return (
        <div>
            <Table />
        </div>
    );
};

export default TanstackTable;