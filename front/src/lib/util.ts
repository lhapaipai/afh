export function getLocationLabel(location: string | null) {
  switch (location) {
    case "lumiere-auditorium": {
      return "Auditorium";
    }
    case "lumiere-exposition": {
      return "pause nord, sud, étages 1 et 2";
    }
    case "lumiere-templiers": {
      return "Salle des Templiers";
    }
    case "lumiere-templiers-cachat": {
      return "Salle des Templiers ou Cachat";
    }
    case "lumiere-graziella": {
      return "Salle des Graziella";
    }
    case "festivites": {
      return "Palais des festivités";
    }
    default:
      return "à définir";
  }
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
