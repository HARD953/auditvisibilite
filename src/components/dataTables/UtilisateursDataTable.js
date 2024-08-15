
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from 'primereact/badge';
import { deleteUtilisateur } from 'src/api/users';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { exportCSV, exportExcel, exportPdf } from 'src/utils/exportsFn';
import { main_app_path } from 'src/router';
import ShowSupportDeleteDialog from '../dialogs/showSupportDelete';
import { Skeleton } from 'primereact/skeleton';


export default function UtilisateursDataTable({
  isLoading,
  isFetching,
  data,
  fetchNextPage,
  querykeys,
  labelTable,
  states
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const exportDataRef = useRef(null);

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page?.results) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.count ?? 0;
  const totalFetched = flatData.length;

  const mutation = useMutation({
    mutationFn: async (id) => await deleteUtilisateur(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: querykeys,
      });
    },
  });

  const [utilisateursData, setUtilisateursData] = useState([]);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const isAgentBody = (rowdata) => {
    const severity = rowdata?.is_agent ? "success" : "danger";
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Badge severity={severity} size="normal" value=""></Badge>
        <p className="my-0 ms-1"> {rowdata?.agent} </p>
      </div>
    );
  };

  const cols = [
    { field: "utilisateur", header: "Utilisateur" },
    { field: "email", header: "Email" },
    { field: "adresse", header: "Adresse" },
    { field: "commune", header: "Commune" },
    { field: "district", header: "District" },
    { field: "entreprise", header: "Entrepise" },
    { field: "departement", header: "Département" },
    { field: "agent", header: "Agent", body: isAgentBody },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const customizedData = (data) => {
    if (!!data?.length) {
      return data?.map((item) => {
        const agent = item?.is_agent ? "OUI" : "NON";
        const name = (item?.first_name || "").toUpperCase();
        return {
          ...item,
          agent: agent,
          utilisateur: `${name} ${item?.last_name}`,
        };
      });
    } else {
      return [];
    }
  };

  const confirmationDelete = (id) => {
    confirmDialog({
      message: "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger rounded-pill",
      rejectClassName: "rounded-pill mx-4",
      rejectLabel: "Non",
      acceptLabel: "Oui",
      accept: () => mutation.mutate(id),
    });
  };

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        if (!isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  const actionsBody = (rowdata) => {
    return (
      <div className="d-flex justify-content-between align-items-center gap-2">
        <Button
          icon="pi pi-eye"
          tooltip="Détails"
          className="mr-2 rounded-pill p-button-info p-button-outlined p-button-raised"
          onClick={() =>
            navigate(`${main_app_path}/utilisateurs-show/${rowdata?.id}`,states)
          }
        />

        <Button
          icon="pi pi-pencil"
          tooltip="Modifier"
          className="mr-2 p-button-primary rounded-pill p-button-outlined p-button-raised"
          onClick={() =>
            navigate(`${main_app_path}/utilisateurs-update/${rowdata?.id}`,states)
          }
        />
        <Button
          icon="pi pi-times"
          tooltip="Supprimer"
          className="mr-2 rounded-pill p-button-outlined p-button-raised p-button-danger"
          onClick={() => confirmationDelete(rowdata?.id)}
        />
      </div>
    );
  };
  const imageBodyTemplate = (support) => {
    return (
      <Avatar
        image={`${support?.profile_image}`}
        className="mr-2"
        size="xlarge"
        shape="circle"
      />
    );
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
        <ConfirmDialog />
        <div className="d-flex align-items-center justify-content-end gap-2">
          <Button
            className="rounded-pill  p-button-outlined"
            tooltip="Exporter en CSV"
            icon="pi pi-file"
            rounded
            onClick={() => exportCSV(false, exportDataRef)}
            data-pr-tooltip="CSV"
          />
          <Button
            className="rounded-pill  p-button-outlined"
            tooltip="Exporter en EXCEL"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={() => exportExcel(utilisateursData, "utilisateurs")}
            data-pr-tooltip="XLS"
          />
          <Button
            className="rounded-pill p-button-outlined"
            tooltip="Exporter en PDF"
            icon="pi pi-file-pdf"
            severity="warning"
            rounded
            onClick={() =>
              exportPdf(exportColumns, utilisateursData, "utilisateurs.pdf")
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

  const loadingTemplate = (options) => {
    return (
      <div
        className="flex align-items-center"
        style={{ height: "17px", flexGrow: "1", overflow: "hidden" }}
      >
        <Skeleton
          width={
            options.cellEven
              ? options.field === "year"
                ? "30%"
                : "40%"
              : "60%"
          }
          height="1rem"
        />
      </div>
    );
  };

  useEffect(() => {
    const response = flatData;
    const customizedResponse = customizedData(response);
    setUtilisateursData(customizedResponse);
  }, [flatData]);

  return (
    <>
      <div className="d-flex justify-content-end align-items-center">
        {/* <h4 className="fw-bolder h4" > Liste utilisateur </h4> */}
        <h4 className="fw-bolder h4">
          {" "}
          {totalDBRowCount} {labelTable}{" "}
        </h4>
      </div>
      <div className="mt-2 shadow p-3">
        <DataTable
          scrollable
          scrollHeight="600px"
          virtualScrollerOptions={{
            lazy: true,
            onLazyLoad: fetchMoreOnBottomReached,
            itemSize: 46,
            showLoader: true,
            loading: isFetching,
            loadingTemplate,
          }}
          ref={exportDataRef}
          filters={filters}
          loading={isLoading || mutation?.isPending}
          filterDisplay="row"
          globalFilterFields={[
            "commune",
            "utilisateur",
            "email",
            "district",
            "entreprise",
            "departement",
            "adresse",
          ]}
          header={header}
          emptyMessage="Aucune donnée trouvée."
          value={utilisateursData}
          size="small"
          sortOrder={1}
          resizableColumns
          stripedRows
          showGridlines
        >
          <Column
            header="N°"
            field="id"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options?.rowIndex + 1}
          ></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          {cols?.map((col, i) => (
            <Column
              key={i}
              // bodyClassName="fw-bolder"
              body={col?.body}
              field={col?.field}
              header={col?.header}
            ></Column>
          ))}

          <Column
            header="    "
            headerStyle={{ width: "3rem" }}
            body={actionsBody}
          ></Column>
        </DataTable>
      </div>
      <ShowSupportDeleteDialog
        visible={visibleModalDelete}
        setVisible={setVisibleModalDelete}
        selectedSupport={utilisateursData}
      />
    </>
  );
}
        