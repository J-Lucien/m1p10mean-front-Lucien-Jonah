import { IHoraireTravail } from "./IHoraireTravail";
import { IService } from "./IService";

export interface IEmployee {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    estValide: boolean;
    estConfirme: boolean;
    tauxCommission: number;
    horaireTravail: IHoraireTravail[];
    serviceOccupe: IService[];
}