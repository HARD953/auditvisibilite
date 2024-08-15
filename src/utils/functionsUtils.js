export const customizeNumerFormat =(valeur)=>{
    const value = parseInt(valeur) ?? 0
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }


export function capitalizeWords(sentence) {
    if (!sentence) {
      return sentence;
    }
    const wordsLower = (sentence?.toLowerCase())
    const words = wordsLower.split(' ');
  
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    const capitalizedSentence = capitalizedWords.join(' ');
  
    return capitalizedSentence;
}


export function ajouterPrefixeSiNecessaire(imageUrl) {
  const prefixeAttendu = "https://auditapi.up.railway.app/api";
  let image = String(imageUrl)
  if (!!image) {
    if (!image.startsWith(prefixeAttendu)) {
      image = prefixeAttendu + image;
    }
  }
  
  return image || "";
}


export const getDateEnglishFormatYearMonthDay = (date) => {
  const dateValue = date?? ""
  return  !!dateValue ? dateValue
  .toLocaleDateString("fr")
  .replace(/\//g, "-")
  .split("-")
  .reverse()
  .join("-")
  : ""
}

export const getDateAndTimeInFr = (date)=>{
  const options = { year: 'numeric', month:'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"  }
  return String(
    new Date(date).toLocaleString("fr-FR", options)
  );
}