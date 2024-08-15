import { configHeadersToken, instance } from "./axiosInstance"



export const getEntreprises = async()=>{
    try {
        const response = await instance.get(
          "entreprise/",
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getVillesFiltre = async () => {
  try {
    const response = await instance.get("fville/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getCommunes = async () => {
  try {
    const response = await instance.get("fcommune/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};



export const getMarques = async () => {
  try {
    const response = await instance.get("fmarque/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};



export const getQuartiers = async () => {
  try {
    const response = await instance.get("fquartier/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getTypeSupports = async () => {
  try {
    const response = await instance.get("fsupports/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getCanaux = async () => {
  try {
    const response = await instance.get("fcanal/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getEtatSupports = async () => {
  try {
    const response = await instance.get("fetat/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getTypeSites = async () => {
  try {
    const response = await instance.get("fsite/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getVisibilites = async () => {
  try {
    const response = await instance.get("fvisibilite/", configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

