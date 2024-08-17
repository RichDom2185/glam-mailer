import { Blockquote } from "@mantine/core";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useAppSelector } from "../store";
import { Draft } from "../types/draft";

const columns: ColDef<Draft>[] = [
  {
    field: "content",
    headerName: "Content",
    valueFormatter: (params) => params.value?.substring(0, 50),
  },
];

const Drafts: React.FC = () => {
  const drafts = useAppSelector((state) => state.drafts.drafts);

  const dummy: Draft[] = Array.from({ length: 1000 }, (_, i) => ({
    id: `${i}`,
    content: `Draft ${i}`,
  }));

  return (
    <div>
      <Blockquote color="blue" radius="lg" mt="xl">
        Coming soon&hellip;
      </Blockquote>
      <div className="ag-theme-quartz">
        <AgGridReact
          rowData={dummy}
          columnDefs={columns}
          rowSelection="multiple"
          rowMultiSelectWithClick
          animateRows
          pagination
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

// For lazy loading
export const Component = Drafts;
Component.displayName = "Drafts";

export default Drafts;
