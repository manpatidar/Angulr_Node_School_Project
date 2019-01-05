import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Student } from '../model/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class StudentService {

    allStudentUrl = "http://localhost:3000/students/getAll";
    rudUrl = "http://localhost:3000/students/student/";
    deleteUrl = "http://localhost:3000/students/delete";
    resultUrl = "http://localhost:3000/students/getAll";
    createUrl = "http://localhost:3000/students/student";

    constructor(private http: HttpClient) { }

    getAllStudents() {
        return this.http.get<Student[]>(this.allStudentUrl);
            //.pipe(map(success => { this.extractData }))._catch(this.handleError);
    }
    createStudent(student: Student) {
        return this.http.post<any>(this.createUrl, student);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    updateStudent(student: Student){
        return this.http.put<any>(this.rudUrl + student.id, student);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    deleteStudentById(studentId: string) {
        return this.http.delete<any>(this.rudUrl + studentId);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);
    }
    getStudentById(studentId: string){
        return this.http.get<Student>(this.rudUrl + studentId);
           // .pipe(map(success => { this.extractData }))._catch(this.handleError);
    }
    getResultByRoll(rollnumber: number) {
        return this.http.get<Student>(this.resultUrl + rollnumber);
            //.pipe(map(success => { this.extractData }))._catch(this.handleError);
    }
    loadStudentListByClass(className: string) {
        return this.http.post<Student[]>("http://localhost:3000/students/className",{className: className});
            //.pipe(map(success => { this.extractData }))._catch(this.handleError);
    }
    deleteAllStudent(){
        return this.http.delete<any>(this.deleteUrl);
            //.pipe(map(success => { success => success.status }))._catch(this.handleError);
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