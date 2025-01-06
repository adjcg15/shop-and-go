function validateBirthdate(value: string): string | true {
  const birthDate = new Date(value);
  const today = new Date();

  if (birthDate > today) {
    return "La fecha de nacimiento no puede ser futura.";
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  if (age < 18) {
    return "Debes tener al menos 18 años.";
  }

  if (age > 120) {
    return "Edad inválida. Ingresa una edad válida (menos de 120 años).";
  }

  return true;
}

function formatDate(dateString: string | undefined): string {
  const [year, month, day] = dateString!.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
}

function parseToCommonTime(time: string) {
  if(time.length !== 8) {
    return time;
  }

  return time.substring(0, 5);
}

function formatDDMMYYY(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`
}

function formatCommonTime(date: Date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}

export {
  validateBirthdate,
  formatDate,
  parseToCommonTime,
  formatDDMMYYY,
  formatCommonTime
};