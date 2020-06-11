export interface IResponse {
  statusCode: number;
  message: string;
  payload: object | {};
  error?: any;
  token?: string;
}
const response = (resp: IResponse) => resp;

export default response;
