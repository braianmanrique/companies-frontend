import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard'!!,
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: '/'},
       
      ]
    },
    {
      title: 'Supporting'!!,
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Users', url: 'users'},
        {title: 'Companies', url: 'companies'},
        {title: 'Articles', url: 'articles'}
      ]
    }
  ]
  constructor() { }
}
