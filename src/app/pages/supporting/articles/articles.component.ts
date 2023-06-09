import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';


import "jspdf-autotable";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articles: Article[] = []
  public loading:boolean = true;
  public pdf: any;
  private imageSubs!: Subscription;

  constructor(private articleService: ArticleService, public userService: UserService ,private modalImageService: ModalImageService, private searchesService: SearchesService){

  }
  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }
  
  ngOnInit(): void {
    this.sharedArticles()

    this.imageSubs = this.modalImageService.newImage
    .pipe(
      delay(100)
    )
    .subscribe(img => this.sharedArticles());
  }
  doc = new jsPDF();

 
  createPdf() {
    const doc = new jsPDF('l', 'mm', 'a4'); 
    
    // this.doc.fromHTML(document.getElementById("title").innerHTML);
    doc.text( "Product detailed report", 200, 300, );

   

  const values = this.articles.map( (key:any) => {
        return [key.name ,  
              key.company.name ];
      });
  

console.log(values);
    const head = [['Name', 'Company']]
    const data =  values
    
    autoTable(doc, {
        head: head,
        body: data,
        didDrawCell: (data) => { },
    });

   this.pdf = doc.save('stock.pdf');
  }
  sharedArticles(){
    this.loading = true;
    this.articleService.sharedArticles().subscribe(resp=> {
      this.loading = false;
      this.articles = resp
    })
  }

 openModal(article:Article){
    this.modalImageService.openModal('articles',article._id!, article.img);
  }

  search(term: string){

    if(term.length === 0 ){
      return this.sharedArticles();
    }

    this.searchesService.search('articles', term).subscribe({
      next: (results) => {
        this.articles = results as Article[]
      },error: (err) => {
        console.log(err)
      }
    })
  return true;
  }

  deleteArticle(article:Article){
    
    Swal.fire({
      title: 'Are you sure?',
      text: `delete to ${article.name}`,
      icon: 'question',
      showCancelButton: true,
    
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value){
          this.articleService.deleteArticle(article._id!)
            .subscribe(resp => {
              Swal.fire('Article Deleted!', 'ok.', 'success');
              this.sharedArticles();
            })
        }
      }
    })
    return;
  }
  
  async sendEmail(){
    this.articleService.sendEmail(this.pdf).subscribe(resp=>{
      console.log(resp)
    })
   

  }
  

}
