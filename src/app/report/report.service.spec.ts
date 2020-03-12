import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ReportService } from './report.service';
import { User } from '../Model/User';


describe('UserService', () => {
    let httpTestingController: HttpTestingController;
    let service: ReportService;
    let userUrl;
    let userData;
    let registerUrl;
    // let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ReportService]
    });
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ReportService);
    userUrl = environment.baseApiUrl + environment.userApiUrl;
    registerUrl = environment.authApiRegisterUrl;
    userData = {
        id: '1',
        userName: 'sa',
        password: 'sdada',
        emailId: 'fyuuy',
        token: 'event1',
        userRoleId: 1,
    };
  });

    it('should User service be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call the getUser method and reurn a expected User ', () => {
            service.getUserById('1').subscribe();
            const url = `${userUrl}/${1}`;
            const req =   httpTestingController.expectOne(url);
            req.flush(userData);
            httpTestingController.verify();
    });

    it('should call the deleteUser method. ', () => {
        service.deleteUser('1').subscribe();
        const url = `${userUrl}/${1}`;
        const req =   httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();
    });

    it('should call the createUser method and reurn a created User ', () => {
        service.createUser(userData).subscribe();
        const url = `${registerUrl}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(userData);
        httpTestingController.verify();
    });

    it('should call the updateUser method and reurn a updated User ', () => {
        service.updateUser(userData).subscribe();
        const url = `${userUrl}/${1}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(userData);
        httpTestingController.verify();
    });

    it('should get the user list from UserList stream', () => {
        const expectedUser: User[] =
        [{
            id: '1',
            userName: 'sa',
            password: 'sdada',
            emailId: 'fyuuy',
            token: 'event1',
            userRoleId: 1,
        }, {
            id: '2',
            userName: 'sa',
            password: 'sdada',
            emailId: 'fyuuy',
            token: 'event1',
            userRoleId: 2,
        }];
        // httpClientSpy.get.and.returnValue(expectedEvent);

        let data: any[];
        service.userList$.subscribe(
            d => data = d,
        );
        const url = `${userUrl}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(expectedUser);
        httpTestingController.verify();

        expect(data.length).toBe(2);

    });

    it('should get the Pmo user list from UserList stream', () => {
        const expectedUser: User[] =
        [{
            id: '1',
            userName: 'sa',
            password: 'sdada',
            emailId: 'fyuuy',
            token: 'event1',
            userRoleId: 1,
        }, {
            id: '2',
            userName: 'sa',
            password: 'sdada',
            emailId: 'fyuuy',
            token: 'event1',
            userRoleId: 2,
        }];
        // httpClientSpy.get.and.returnValue(expectedEvent);

        let data: any[];
        service.pmoUser$.subscribe(
            d => data = d,
        );
        const url = `${userUrl}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(expectedUser);
        httpTestingController.verify();

        expect(data.length).toBe(1);

    });
});
