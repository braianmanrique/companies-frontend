import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Company } from 'src/app/models/company.mode';
import { CompanyService } from 'src/app/services/company.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit , OnDestroy {
  public companies : Company[] = []
  public loading: boolean = true;
  private imageSubs!: Subscription;
  constructor(private companyService: CompanyService, private modalImageService: ModalImageService, private searchesService: SearchesService){

  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.uploadCompanies();
    this.imageSubs = this.modalImageService.newImage
    .pipe(
      delay(100)
    )
    .subscribe(img => this.uploadCompanies());
  }

  uploadCompanies(){
    this.loading = true;
    this.companyService.uploadCompanies()
        .subscribe(companies => {
          this.companies = companies;
          this.loading = false;
        })
  }

  updateCompany(company: Company){
    
    this.companyService.updateCompany(company._id!, company.name)
      .subscribe(resp => {
        Swal.fire('Updated', company.name, 'success')
      })
  }

  deleteCompany(company: Company){
    this.companyService.deleteCompany(company._id!)
      .subscribe(resp=>{
        this.uploadCompanies();
        Swal.fire('Deleted', company.name, 'success')
        
      })
  }

  async openSweetAlert(){
    const { value: formValues} = await Swal.fire({
      title:'Create Company',
      html:
      '<input required placeholder="name" id="swal-input1" class="swal2-input">' +
      '<input required placeholder="nit" id="swal-input2" class="swal2-input">',
      inputLabel: 'New Company',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const val1 = (document.getElementById(
          'swal-input1'
        ) as HTMLInputElement).value;
        console.log(val1);
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ];
      }
    })
   
    if (formValues?.length === 2) {
     this.companyService.createCompany(formValues[0], formValues[1] ).subscribe({
      next : resp => {
      console.log(resp)
      this.companies.push(resp.company)
      Swal.fire('Saaved', resp.name, 'success')
     },
     error: (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
     }})
     
    }
    
  }

  openModal(company: Company){
    this.modalImageService.openModal('companies',company._id!, company.img);
  }

  search(term: string){

    if(term.length === 0 ){
      return this.uploadCompanies();
    }

    this.searchesService.search('companies', term).subscribe({
      next: (results) => {
        this.companies = results as Company[]
      },error: (err) => {
        console.log(err)
      }
    })
  return true;
  }
}
