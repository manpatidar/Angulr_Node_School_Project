import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    allUserUrl = "http://localhost:3000/users/getAll";
    rudUrl = "http://localhost:3000/users/user/";
    createUrl = "http://localhost:3000/users/user";
    authUrl = "http://localhost:3000/users/login";

    constructor(private http: HttpClient) {
    }

    getAllUser(): Observable<User[]> {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get(this.allUserUrl)
            .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    createUser(user: User): Observable<number> {
        return this.http.post(this.createUrl, user)
            .pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    getUserById(userId: string): Observable<User> {
        return this.http.get(this.rudUrl + userId)
            .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    updateUser(user: User): Observable<number> {
        return this.http.put(this.rudUrl + user.id, user)
            .pipe(map(success => { success => success.status }))._catch(this.handleError);
    }

    deleteUserById(userId: string): Observable<number> {
        return this.http.delete(this.rudUrl + userId)
            .pipe(map(success => { success => success.status }))._catch(this.handleError);
    }

    login(userName: String, password: String): Observable<number> {
        return this.http.post(this.authUrl, { userName, password })
            .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}
