import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "primereact/button"; 
import { useNavigate } from "react-router-dom";
import { getUtilisateursRecenseurs } from "src/api/users";
// import UtilisateursOld from "./UtilisateursOld";
import UtilisateursDataTable from "src/components/dataTables/UtilisateursDataTable";
import { main_app_path } from "src/router";


function UtilisateursRecenseurs() {
  const navigate = useNavigate()

    const querykeys = ["utilisateurs-recenseurs"];
  const labelHeader = "Agents Recenseurs"
  const { isLoading, isFetching, data, fetchNextPage } = useInfiniteQuery({
    queryKey: querykeys,
    queryFn: ({ pageParam = 1 }) => getUtilisateursRecenseurs(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const size = 10;
      const count = lastPage?.count;
      const allPagesLength = allPages.length;
      const countVleu = count / allPagesLength;
      const fetchingNext = countVleu > size ? allPagesLength + 1 : null;
      return fetchingNext;
    },
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });



    return ( 
        <section className="">
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div className="">
              <h2 className="fw-bolder h2" style={{color:'var(--color-lanfia-primary-3)'}}>
                Agents recenseurs
                </h2>
              <p> Gérer les agents recenseurs </p>
              </div>
               
                <div className="">
                  <Button
                    label={`Ajouter ${labelHeader} `}
                    onClick={()=> navigate(`${main_app_path}/utilisateurs-create`,{state:{
                      from:"recenseur",
                      goBack:"utilisateurs-recenseurs",
                      title:"Agent recenseur",
                      urlRequest:"urecenseur/"
                    }})}
                    icon="pi pi-plus"
                    iconPos="right"
                    className="rounded-pill"
                  />
                </div>
            </div>
            <UtilisateursDataTable 
              fetchNextPage={fetchNextPage}
              isLoading={isLoading}
              isFetching={isFetching}
              data={data}
              querykeys={querykeys}
              labelTable={labelHeader}
              states={
                {state:{
                      from:"recenseur",
                      goBack:"utilisateurs-recenseurs",
                      title:"Agent recenseur",
                      urlRequest:"urecenseur/"
                }}
              }
            />
            {/* <UtilisateursOld /> */}
        </section>
     );
}

export default UtilisateursRecenseurs