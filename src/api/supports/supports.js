import { configHeadersFormDataToken, configHeadersToken, instance } from "../axiosInstance"



export const addSupport = async(body)=>{
    try {
        const response = await instance.post("donneescollectees/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateSupport = async(id,body)=>{
    try {
        const response = await instance.patch(`donneescollectees/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getSupport = async(id)=>{
    try {
        const response = await instance.get(`donneescollectees/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getSupports = async(page)=>{
    try {
        const response = await instance.get(`donneescollectees/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const deleteSupport = async (id) => {
  try {
    const response = await instance.delete(
      `donneescollectees/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getSupportsFilters = async (payload) => {
  try {
    const response = await instance.post(
      `donneescollectees/`,payload,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};



export const getSupportsGeoCollecte = async(debut,fin)=>{
    try {
        const response = await instance.get(`gcollecte/${debut}/${fin}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getSupportsOperateurs = async(debut,fin)=>{
    try {
        const response = await instance.get(`collectem/${debut}/${fin}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getSupportsCommunes = async(debut,fin)=>{
    try {
        const response = await instance.get(`collecte/${debut}/${fin}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getSupportsLocation = async()=>{
    try {
        const response = await instance.get("donneescollectees/", configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


