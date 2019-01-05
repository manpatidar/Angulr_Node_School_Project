import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Member } from '../model/member';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class MemberService {

    allMemberUrl = "http://localhost:3000/members/getAll";
    rudUrl = "http://localhost:3000/members/member/";
    createUrl = "http://localhost:3000/members/member";

    constructor(private http: HttpClient) { }

    getAllMember(): Observable<Member[]> {
        return this.http.get<Member[]>(this.allMemberUrl);
            //.pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    createMember(member: Member) {
        return this.http.post<any>(this.createUrl, member);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);

    }
    getMemberById(memberId: string): Observable<Member> {
        return this.http.get<Member>(this.rudUrl + memberId);
           // .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    updateMember(member: Member): Observable<number> {
        return this.http.put<any>(this.rudUrl + member.id, member);
           // .pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    
    deleteMemberById(memberId: string): Observable<number> {
        return this.http.delete<any>(this.rudUrl + memberId);
           // .pipe(map(success => { success => success.status }))._catch(this.handleError);
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