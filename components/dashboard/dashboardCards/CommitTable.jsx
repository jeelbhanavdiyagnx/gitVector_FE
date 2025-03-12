import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ArrowDownUp, ChevronLeft, ChevronRight } from 'lucide-react';
import CommitClassification from '@/components/Branch/CommitClassification';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { BarChartSkeleton } from '../repositories/CustomSkeletons';
import NoDataAvailable from '../overview/noDataAvailable';
import CardHeading from './CardHeading';

function CommitTable({
  isDataEmpty,
  placeholder,
  loading,
  onChange,
  data,
  filteredCommits,
  currentPage,
  totalPages,
  selectedUser,
  handlePageChange,
  sortData,
  sortColumn
}) {
  const handleSelect = (value) => {
    onChange(value);
  };
  const getArrow = (column) => sortColumn === column;
  
  return (
    <Card className=" flex h-full flex-col px-0 py-4">
      <CardHeading
        title={'User commit performance'}
        tooltipContent={'Analyse user commit scores'}
      />
      {loading ? (
        <BarChartSkeleton />
      ) : data?.length ? (
        <div className="flex h-full flex-col justify-between">
          <div className="px-3 pt-6">
            <div className=" rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer bg-transparent py-2 text-center">
                      <Select
                        onValueChange={handleSelect}
                        value={selectedUser}
                      >
                        <SelectTrigger className="flex items-center gap-0 rounded-md border bg-white dark:bg-black dark:text-white px-1 py-1 text-black">
                          <SelectValue placeholder={placeholder}>
                            {selectedUser || placeholder}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Show All">Show All</SelectItem>
                          {data.map((item) => (
                            <SelectItem
                              key={item.username || item.repoName}
                              value={item.username || item.repoName}
                            >
                              {item.username || item.repoName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableHead>
                    {[
                      { key: 'commits', label: 'Commits' },
                      { key: 'files', label: 'Files' },
                      { key: 'additions', label: '+Lines' },
                      { key: 'deletions', label: '-Lines' },
                      {
                        key: 'documentation',
                        label: <CommitClassification type="Documentation" />
                      },
                      {
                        key: 'bugFix',
                        label: <CommitClassification type="Bugfix" />
                      },
                      {
                        key: 'featureEnhancement',
                        label: (
                          <CommitClassification type="Feature/Enhancement" />
                        )
                      },
                      {
                        key: 'chore',
                        label: <CommitClassification type="Chore"  />
                      }
                    ].map(({ key, label }) => (
                      <TableHead
                        key={key}
                        onClick={() => sortData(key)}
                        className={`cursor-pointer text-center ${
                          getArrow(key)
                            ? 'rounded-sm bg-slate-200'
                            : 'bg-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 dark:text-white text-black">
                          {label}
                          <ArrowDownUp strokeWidth={1} className="h-5 w-3" />
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommits.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="text-center">
                        {item.username || item.repoName }
                      </TableCell>
                      <TableCell className="text-center">
                        {item.commits}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.files}
                      </TableCell>
                      <TableCell className="text-center text-green-600">
                        +{item.additions}
                      </TableCell>
                      <TableCell className="text-center text-red-600">
                        -{item.deletions}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.documentation}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.bugFix}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.featureEnhancement}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.chore}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded-md text-sm ${
                currentPage === 1
                  ? 'cursor-not-allowed text-gray-400'
                  : 'border-gray-500 text-black'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-md px-2 py-1 text-xs ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-black'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={` rounded-md  text-sm ${
                currentPage === totalPages
                  ? 'cursor-not-allowed text-gray-400'
                  : 'border-gray-500 text-black'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
}

export default CommitTable;
