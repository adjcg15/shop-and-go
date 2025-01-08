import { FC } from "react";

type UserTypeSelectorProps = {
  isEmployee: boolean;
  setIsEmployee: (value: boolean) => void;
};

export const UserTypeSelector: FC<UserTypeSelectorProps> = ({ isEmployee, setIsEmployee }) => {
  const userTypePlainStyle = "border-gray-300 border w-full py-3 rounded-l-lg hover:bg-gray-50";
  const userTypeActiveStyle = "border py-3 w-full rounded-l-lg hover:bg-gray-50 text-blue-600 border-blue-600";

  return (
    <nav className="mt-3 w-full">
      <ul className="flex font-bold w-full">
        <li className="w-1/2">
          <button
            onClick={() => setIsEmployee(false)}
            className={!isEmployee ? userTypeActiveStyle : userTypePlainStyle}
            aria-describedby="clientButtonDescription"
          >
            Soy cliente
          </button>
          <p className="sr-only" id="clientButtonDescription">Cambiar a inicio de sesión como cliente</p>
        </li>
        <li className="w-1/2">
          <button 
            onClick={() => setIsEmployee(true)}
            className={`
              ${isEmployee ? userTypeActiveStyle : userTypePlainStyle} 
              rounded-r-lg rounded-l-none
            `}
            aria-describedby="employeeButtonDescription"
          >
            Soy empleado
          </button>
          <p className="sr-only" id="employeeButtonDescription">Cambiar a inicio de sesión como empleado</p>
        </li>
      </ul>
    </nav>
  );
}
