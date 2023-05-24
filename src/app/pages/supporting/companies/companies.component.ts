import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.mode';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  public companies : Company[] = []
  public loading: boolean = true;
  constructor(private companyService: CompanyService){

  }
  ngOnInit(): void {
    this.uploadCompanies();
  }

  uploadCompanies(){
    this.loading = true;
    this.companyService.uploadCompanies()
        .subscribe(companies => {
          this.companies = companies;
          this.loading = false;
          console.log('com',companies)
        })
  }
}
