import { HttpClient } from '@angular/common/http';

export class BaseService {
    constructor(protected http: HttpClient) {
    }

    public readonly baseUrl: string = 'https://baas.kinvey.com';
    public readonly appKey: string = 'kid_Hy3D2b8IX';
    public readonly appSecret: string = '8111fd984281490381f599db92fa9484';
    public readonly appDataModule: string = 'appdata';
    public readonly userModule: string = 'user';

    public constructUrl (module, endpoint, query = null) {
        let url = `${this.baseUrl}/${module}/${this.appKey}/${endpoint}`;
        if (query) {
            url += '?query=' + query;
        }
        return url;
    }
}
