import React, { useState, useEffect } from 'react';
import { GrAnalytics,GrClipboard,GrCalculator,GrMultiple} from "react-icons/gr";
import CardAuditAccueil from 'src/components/cards/cardAuditAccueil';
import {CardAccueilChartBons} from 'src/components/cards/cardAccueilChart';

import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import CommuneDataTable from 'src/components/dataTables/CommunesDataTable';
import OperateurDataTable from 'src/components/dataTables/OperateurDataTable';
import { useQuery } from '@tanstack/react-query';
import { getSupportsCommunes, getSupportsGeoCollecte } from 'src/api/supports/supports';
import { getDateEnglishFormatYearMonthDay } from 'src/utils/functionsUtils.js';
import "src/assets/css/accueil.css"



const Accueil = () => {
  const today = new Date()
  const debutMois = new Date(today.getFullYear(), today.getMonth(),1)

  const [dashboardData, setDashboardData] = useState({});
  const [dateStart, setDateStart] = useState(debutMois);
  const [dateEnd, setDateEnd] = useState(today);

  const {data} = useQuery({
    queryKey: ["supports-geo-collecte",dateStart,dateEnd],
    queryFn: async()=> await getSupportsGeoCollecte(getDateEnglishFormatYearMonthDay(dateStart),getDateEnglishFormatYearMonthDay(dateEnd))
  })

  const { isLoading : isLoadingSupportCommune, data : dataSupportCommune } = useQuery({
    queryKey: ["supports-communes",dateStart,dateEnd],
    queryFn: async () => await getSupportsCommunes(getDateEnglishFormatYearMonthDay(dateStart),getDateEnglishFormatYearMonthDay(dateEnd)),
  });

  addLocale('fr', {
    firstDayOfWeek: 1,
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samédi'],
    dayNamesShort: ['Dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
    monthNamesShort:['jan','fév','mar','avr','mai','jui','juil','aoû','sep','oct','nov','déc'],
    today: "Aujourd'hui",
    clear: 'Effacer'
  });

    
  const dateFormat= (date)=>{
    const _date = !!date ? date : new Date()
    return new Date(_date)?.toLocaleDateString()

  }

  useEffect(() => {
    setDashboardData(data);
   
  }, [data]); // Retirer dashboardData de la liste des dépendances


  return (
    <section className='mb-5'>
      <div className="d-flex justify-content-between align-items-center">
        
        <div className="mb-5 justify-content-between align-items-center">
            <h2 className="fw-bolder h2" style={{color:'var(--color-lanfia-primary-3)'}}>
              Tableau de bord
            </h2>
            <p> Données  du {dateFormat(dateStart)} au  {dateFormat(dateEnd)}  </p>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-4">
            <div className="flex-auto">
                <label htmlFor="dateStart" className="fw-bolder me-2 block mb-2">
                    Date debut
                </label>
                <Calendar id="dateStart" dateFormat="dd/mm/yy" locale="fr" value={dateStart} onChange={(e) => setDateStart(e.value)} showIcon />
            </div>
            <div className="flex-auto">
                <label htmlFor="dateEnd" className="fw-bolder block  me-2 mb-2">
                    Date fin
                </label>
                <Calendar id="dateEnd" value={dateEnd} onChange={(e) => setDateEnd(e.value)} dateFormat="dd/mm/yy" locale="fr" showIcon />
            </div>

        </div>
      </div>

      <div className='ms-3'>
        <div className="" >
          <h5 className="fw-bolder mt-5 mb-2" >Données chiffrées</h5>
        </div>
        <div className='accueil_cards_audit_container'>
            <CardAuditAccueil 
              title="Nombre total"
              value={dashboardData?.total_aggregations?.Total?.nombre_total }
              Icon={GrAnalytics}
            />
            <CardAuditAccueil 
              title="Coût total redevance TSP"
              value={dashboardData?.total_aggregations?.Total?.somme_montant_total_tsp}
              Icon={GrClipboard}
            />
            <CardAuditAccueil 
              title="Coût total ODP"
              value={dashboardData?.total_aggregations?.Total?.somme_montant_total_odp}
              Icon={GrMultiple}
            />
            <CardAuditAccueil 
              title="Coût total des supports"
              value={dashboardData?.total_aggregations?.Total?.somme_montant_total }
              Icon={GrCalculator}
            />
        </div>

        <div className="pt-5" >
          <h5 className="fw-bolder mt-5 mb-2" >Etat des supports</h5>
        </div>
        <div className="accueil_cards_chart_container">
            <CardAccueilChartBons
              title="Bons"
              total_montant={dashboardData?.total_aggregations?.Bon?.somme_montant_total}
              total={dashboardData?.total_aggregations?.Bon?.nombre_total}
              values={[dashboardData?.total_aggregations?.Bon?.somme_montant_total_tsp,dashboardData?.total_aggregations?.Bon?.somme_montant_total_odp]}
              chartColors={['#00C49F', '#FFBB28']}
            />
            <CardAccueilChartBons 
              title="Défraichis"
              total_montant={dashboardData?.total_aggregations?.Défraichis?.somme_montant_total}
              total={dashboardData?.total_aggregations?.Défraichis?.nombre_total}
              values={[dashboardData?.total_aggregations?.Défraichis?.somme_montant_total_tsp,dashboardData?.total_aggregations?.Défraichis?.somme_montant_total_odp]}
              chartColors={['#0088FE', '#FF8042']}
            />
            <CardAccueilChartBons 
              title="Détérioré"
              total_montant={dashboardData?.total_aggregations?.Détérioré?.somme_montant_total}
              total={dashboardData?.total_aggregations?.Détérioré?.nombre_total}
              values={[dashboardData?.total_aggregations?.Détérioré?.somme_montant_total_tsp,dashboardData?.total_aggregations?.Détérioré?.somme_montant_total_odp]}
              chartColors={['#546E7A', '#546E23']}
            />
        </div>

        <div className=''>
          <div className="pt-5" >
            <h5 className="fw-bolder mt-5 mb-2" >Etat des supports par Comune</h5>
          </div>
          <CommuneDataTable 
            isLoading={isLoadingSupportCommune}
            data={dataSupportCommune}/>

          <div className="pt-5" >
            <h5 className="fw-bolder mt-5 mb-2" >Etat des supports par Marque</h5>
          </div>
          <OperateurDataTable  dateDebut={getDateEnglishFormatYearMonthDay(dateStart)} dateFin={getDateEnglishFormatYearMonthDay(dateEnd)}/>
        </div>
      </div>
      

    </section>
  );
};

export default Accueil;
