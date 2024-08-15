import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importez les styles CSS de Leaflet
// import markerIcon from '../../images/map-marker.342x512.png'; // Importez votre propre image de marqueur
// import { Col, Divider } from 'antd';
// import Carto from './Cartographie';
import NewMapsContainer from './NewMaps';
import { Button } from 'primereact/button';
import SupportFiltresDialog from 'src/components/dialogs/SupportFiltresDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupportsFilters } from 'src/api/supports/supports';
import { getDateEnglishFormatYearMonthDay } from 'src/utils/functionsUtils';
import { Badge } from 'primereact/badge';

const Map = () => {


  const queryClient = useQueryClient();
  const today = new Date()
  const debutMois = new Date(today.getFullYear(), today.getMonth(),1)

  const initialFilters = {
    start_date: debutMois,
    end_date: today,
    entreprise: '',
    Marque: '',
    commune: '',
    quartier: '',
    type_support: '',
    canal: '',
    etat_support: '',
    typesite: '',
    visibilite: '',
    duree: '',
    surface: ''
  }
  
  const [supportsData, setSupportsData] = useState([]);
  
  const [filtersPayload, setFiltersPayload] = useState(initialFilters);


    const [visibleSupportFiltresDialog, setVisibleSupportFiltresDialog] = useState(false);
  // const navigate = useNavigate()
  const [nbFiltres, setNbFiltres] = useState(0);

  const mutationFilter = useMutation({
    mutationKey: ["supports", filtersPayload],
    mutationFn: async (body) => await getSupportsFilters(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["supports"],
      });
      // setVisibleAddForm(false)
      // setVisibleSuccessAdd(true);
      const supports = data?.length ? data : []
      setSupportsData(supports)
    },
    onError: () => {
      // setVisibleSuccessError(true);
    },
  });


  const dateFormat= (date)=>{
    const _date = !!date ? date : new Date()
    return new Date(_date)?.toLocaleDateString()

  }


  const checkEmptyFilter = (data) => {
    const filtersPayloadCopie = { ...data };
    const entriesData = Object.entries(filtersPayloadCopie);
    return entriesData.filter(
      (item) =>
        item[1] !== "" && item[0] !== "start_date" && item[0] !== "end_date"
    ).length;
  };

  useEffect(()=>{
    mutationFilter?.mutate({
      ...filtersPayload,
      start_date: getDateEnglishFormatYearMonthDay(
        filtersPayload?.start_date
      ),
      end_date: getDateEnglishFormatYearMonthDay(filtersPayload?.end_date),
    
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    useEffect(() => {
    const emptyLength = checkEmptyFilter(filtersPayload);
    setNbFiltres(emptyLength);
  }, [filtersPayload]);


    return (
      <>
      <section className="">

            <div className="mb-5 d-flex justify-content-between align-items-center">
            <div className="">
                <h2 className="fw-bolder h2" style={{color:'var(--color-lanfia-primary-3)'}}>
                Carte des supports
                </h2>
                <p>support pulicitaires  du {dateFormat(filtersPayload?.start_date)} au  {dateFormat(filtersPayload?.end_date)} </p>
            </div>

            <div className="">
                  <Button
                    label="Filtres"
                    onClick={()=> setVisibleSupportFiltresDialog(true)}
                    icon="pi pi-filter"
                    iconPos="left"
                    className="rounded-pill px-4 p-button-outlined"
                   >{ !!nbFiltres &&
                    <Badge value={nbFiltres} severity="danger"></Badge>}
                  </Button>
                </div>
                
            </div>
     
        <div className="d-flex justify-content-end align-items-center">
          <h4 className="fw-bolder h4"> {supportsData?.length} supports </h4>
        </div>
          <div className="shadow p-3">
            {/* <Carto/> */}
            <NewMapsContainer filtersPayload={filtersPayload} supportsData={supportsData} />
          </div>
      </section>


        <SupportFiltresDialog 
          visible={visibleSupportFiltresDialog}
          setVisible={setVisibleSupportFiltresDialog}
          filtersPayload={filtersPayload}
          setFiltersPayload={setFiltersPayload}
          mutationFilter={mutationFilter}
          initialFilters={initialFilters}
          supportsData={supportsData}
          nbFiltres={nbFiltres}
          
        />
      </>
  
  
    );
  };
  
  export default Map;
  