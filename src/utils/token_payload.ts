import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface TokenPayload {
    id: string;
    userRole: string;
}

export function getTokenPayload() {
    const token = Cookies.get("token");
    const { id, userRole } = jwtDecode<TokenPayload>(token!);

    return {id, userRole};
}