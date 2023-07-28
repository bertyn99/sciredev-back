export interface ControllerPort {
  create(data: string);
  getAll();
}
// This will be our injection token.
export const CONTROLLERPORT = Symbol('CONTROLLERPORT');
