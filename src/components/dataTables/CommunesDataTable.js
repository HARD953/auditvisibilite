import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { exportCSV, exportExcel, exportPdf } from 'src/utils/exportsFn';
// import { useQuery } from '@tanstack/react-query';
// import { getSupportsCommunes } from 'src/api/supports/supports';



export default function CommuneDataTable({ isLoading, data}) {
  const exportDataRef = useRef(null);

  const [communeData, setCommuneData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  

  const cols = [
    // { field: 'id', header: 'N°' },
    { field: "comune", header: "Commune" },
    { field: "type", header: "Category" },
    { field: "nombre_total", header: "NB Total" },
    { field: "somme_montant_total_tsp", header: "Montant TSP" },
    { field: "somme_montant_total_odp", header: "Montant ODP" },
    { field: "somme_montant_total", header: "TOTAL" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const customizedComuneData = (comuneData) => {
    const transformedData = [];
    for (const commune in comuneData) {
      for (const type in comuneData[commune]) {
        const item = {
          comune: commune,
          type: type,
          ...comuneData[commune][type],
        };
        transformedData.push(item);
      }
    }
    return transformedData;
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between aling-items-center">
        <div className="d-flex align-items-center justify-content-end gap-2">
          <Button
            className="rounded-pill p-button-outlined"
            tooltip="Exporter en CSV"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false, exportDataRef)}
            data-pr-tooltip="CSV"
          />
          <Button
            className="rounded-pill p-button-outlined"
            tooltip="Exporter en EXCEL"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={() => exportExcel(communeData, "commune_support")}
            data-pr-tooltip="XLS"
          />
          <Button
            className="rounded-pill p-button-outlined"
            tooltip="Exporter en PDF"
            icon="pi pi-file-pdf"
            severity="warning"
            rounded
            onClick={() =>
              exportPdf(exportColumns, communeData, "commune_supports.pdf")
            }
            data-pr-tooltip="PDF"
          />
        </div>
        <div className="d-flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="rounded-pill"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Rechercher ..."
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  useEffect(() => {
    const customizedData = customizedComuneData(data?.communes_aggregations);
    setCommuneData(customizedData);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-2 shadow p-3">
      <DataTable
        paginator
        rows={10}
        ref={exportDataRef}
        filters={filters}
        loading={isLoading}
        filterDisplay="row"
        globalFilterFields={["commune", "type"]}
        header={header}
        emptyMessage="Aucune donnée trouvée."
        value={communeData}
        rowGroupMode="rowspan"
        groupRowsBy="comune"
        sortMode="single"
        sortField="comune"
        size="large"
        sortOrder={1}
        resizableColumns
        stripedRows
        showGridlines
        //   tableStyle={{
        //     minWidth: "50rem",
        //     borderColor: "#000",
        //     borderWidth: "5px !important",
        //   }}
        // tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          header="N°"
          field="id"
          headerStyle={{ width: "3rem" }}
          body={(data, options) => options?.rowIndex + 1}
        ></Column>
        <Column
          bodyClassName="fw-bolder"
          field="comune"
          header="Commune"
        ></Column>

        <Column field="type" header="Type"></Column>

        <Column field="nombre_total" header="NB Total"></Column>

        <Column field="somme_montant_total_tsp" header="Montant TSP"></Column>

        <Column field="somme_montant_total_odp" header="Montant ODP"></Column>

        <Column
          headerClassName="py-2"
          field="somme_montant_total"
          header="TOTAL"
        ></Column>
      </DataTable>
    </div>
  );
}
        