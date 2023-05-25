import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Company } from 'src/app/models/company.mode';
import { ArticleService } from 'src/app/services/article.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public companies: Company[] = []
  public companySelected!: Company;
  public articleSelected!: Article;

  public articleForm : FormGroup = this.fb.group({
    name: ['', Validators.required],
    company: ['', Validators.required]
  })
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( ({id})=>{
      this.sharedArticle(id)
    })

    this.shareCompanies();
    this.articleForm.get('company')?.valueChanges
      .subscribe(CompanyId => {
        this.companySelected = this.companies.find(comp => comp._id === CompanyId)!;

      })
  }
  constructor(private fb: FormBuilder, private articleService: ArticleService, private companyService: CompanyService, private router: Router
      , private activatedRoute: ActivatedRoute){

  }

  sharedArticle(id:string){
    if(id === 'new'){
      return;
    }
    this.articleService.getArticleById(id)
      .pipe(
        delay(100)
      )
      .subscribe( (article:any)=> {
      if(!article) {
        return this.router.navigateByUrl(`/dashboard/articles`)
      }
      const {name, company: {_id}} = article
      let companyid =  article.company._id
      
      this.articleForm.setValue({name, company :companyid })
      
      this.articleSelected = article
      return;
    })

  }

  savedArticle(){
    debugger
      if(this.articleSelected){
        //update
        console.log(this.articleSelected)
        let data= {
          ...this.articleForm.value,
          _id: this.articleSelected._id
        }
        this.articleService.updateArticle(data).subscribe(data=>{
          Swal.fire('Updated', 'Succes', 'success')
          console.log('rta',data)

        })

      }else{
        this.articleService.createArticle(this.articleForm.value).subscribe((resp:any)=> {
          console.log(resp)
          Swal.fire('Saved', 'Succes', 'success')
          this.router.navigateByUrl(`/dashboard/article/${resp.article._id}`)
        })
      }
  
  }

  shareCompanies(){
    this.companyService.uploadCompanies()
      .subscribe((companies: Company[]) =>{
        console.log(companies)
        this.companies = companies;

      })
  }

  goArticles(){
    this.router.navigateByUrl('/dashboard/articles');
  }
}
