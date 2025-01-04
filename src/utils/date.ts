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

export {
  validateBirthdate,
}
