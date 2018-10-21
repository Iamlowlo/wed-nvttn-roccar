import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MailerService {
  // private sendEmailPath = 'https://us-central1-wed-nvttn-roccar.cloudfunctions.net/sendEmailToUser';
  private sendEmailPath = 'http://localhost:5000/wed-nvttn-roccar/us-central1/sendEmailToUser';
  constructor(private http: HttpClient) { }

  sendEmailToUser(userEmailAddress: string, emailType: string) {
    return this.http.get(`${this.sendEmailPath}`, {
      params: {
        userEmailAddress,
        emailType
      },
      headers: {
        Accept: 'application/json'
      }
    }).map((response: {sent: boolean, err?: string, message?: string}) => {
      return response;
    });
  }
}
