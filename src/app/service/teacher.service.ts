import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Teacher } from '../model/teacher';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class TeacherService {

    allTeacherUrl = "http://localhost:3000/teachers/getAll";
    rudUrl = "http://localhost:3000/teachers/teacher/";
    createUrl = "http://localhost:3000/teachers/teacher";

    constructor(private http: HttpClient) { }

    getAllTeacher(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(this.allTeacherUrl);
           // .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    createTeacher(teacher: Teacher): Observable<number> {
        return this.http.post<any>(this.createUrl, teacher);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    getTeacherById(teacherId: string): Observable<Teacher> {
        return this.http.get<Teacher>(this.rudUrl + teacherId);
            //.pipe(map(success => { this.extractData }))._catch(this.handleError);
    }

    updateTeacher(teacher: Teacher): Observable<number> {
        return this.http.put<any>(this.rudUrl + teacher.id, teacher);
           // .pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    	
    deleteTeacherById(teacherId: string): Observable<number> {
        return this.http.delete<any>(this.rudUrl + teacherId);
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