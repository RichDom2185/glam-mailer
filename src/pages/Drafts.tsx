import { Button, Group, Menu, Pagination, Text } from "@mantine/core";
import { ColDef, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import React, { useCallback, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import StickyToolbar from "../components/common/StickyToolbar";
import { Draft } from "../types/draft";

const columns: ColDef<Draft>[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    width: 50,
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 2,
  },
  {
    field: "content",
    headerName: "Content",
    valueFormatter: (params) => params.value?.substring(0, 50),
    flex: 5,
  },
  {
    field: "createdAt",
    valueGetter: (params) => new Date(params.data!.createdAt),
    valueFormatter: (params) => dayjs(params.value).fromNow(),
    headerName: "Time",
    cellDataType: "date",
    sort: "desc",
    flex: 1,
  },
];

const dummy: Draft[] = Array.from({ length: 920 }, (_, i) => ({
  id: `${i}`,
  subject: `Draft ${i}`,
  content: `Draft content ${i}`,
  createdAt: dayjs().subtract(i, "hour").toISOString(),
}));

const pageSizeOptions = [10, 20, 50, 100];

const Drafts: React.FC = () => {
  const drafts = dummy;
  // const drafts = Object.values(useAppSelector((state) => state.drafts.drafts));
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const gridApi = useRef<GridApi>();

  const handlePageChange = useCallback((newPageNumber: number) => {
    setPageNumber(newPageNumber);
    gridApi.current?.paginationGoToPage(newPageNumber - 1);
  }, []);

  const handlePageSizeChange = (newPageSize: number) => {
    const oldPageSize = pageSize;
    const oldPageNumber = pageNumber;
    const oldPosition = oldPageSize * (oldPageNumber - 1);
    const newPageNumber = Math.ceil(oldPosition / newPageSize);
    handlePageChange(newPageNumber);
    setPageSize(newPageSize);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 20,
      }}
    >
      <StickyToolbar width="100%">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="xs" wrap="nowrap">
            <Text size="sm">
              Drafts is coming soon! Here is some dummy data for now.
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <Text size="sm">Viewing</Text>
            <Menu>
              <Menu.Target>
                <Button
                  variant="transparent"
                  color="blue"
                  px={0}
                  rightSection={<IoMdArrowDropdown />}
                >
                  {pageSize}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {pageSizeOptions.map((option) => {
                  const isSelected = option === pageSize;
                  return (
                    <Menu.Item
                      key={option}
                      onClick={() => handlePageSizeChange(option)}
                      disabled={isSelected}
                    >
                      <Text
                        size="sm"
                        c={isSelected ? "blue" : undefined}
                        fw={isSelected ? "bold" : undefined}
                      >
                        {option}
                      </Text>
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
            <Text size="sm" pr={8}>
              items per page
            </Text>
          </Group>
        </Group>
      </StickyToolbar>
      <div className="ag-theme-quartz" style={{ width: "100%" }}>
        <AgGridReact
          onGridReady={(params) => (gridApi.current = params.api)}
          rowData={drafts}
          columnDefs={columns}
          overlayNoRowsTemplate="No drafts found"
          rowSelection="multiple"
          animateRows
          pagination
          paginationPageSize={pageSize}
          suppressPaginationPanel
          suppressMovableColumns
          domLayout="autoHeight"
        />
      </div>
      <Pagination
        total={Math.ceil(drafts.length / pageSize)}
        value={pageNumber}
        onChange={handlePageChange}
        pb={20}
      />
    </div>
  );
};

// For lazy loading
export const Component = Drafts;
Component.displayName = "Drafts";

export default Drafts;
