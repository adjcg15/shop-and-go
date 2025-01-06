import { Address } from "@/types/types/model/deliveries";

function formatPlainAddressString(address: Address) {
    let plainAddress = "";

    if(address.street && (address.apartmentNumber || address.streetNumber)) {
        plainAddress += address.street + " " + (address.apartmentNumber || address.streetNumber);
    }

    if(address.neighborhood) {
        const block = address.neighborhood + " " + address.postalCode;
        plainAddress += ", " + block.trim();
    }

    if(address.municipality || address.city || address.state) {
        const location = address.municipality + " " + address.city + " " + address.state;
        plainAddress += ", " + location.trim();
    }

    return plainAddress;
}

export {
    formatPlainAddressString
};