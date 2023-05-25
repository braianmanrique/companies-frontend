import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articles: Article[] = []
  public loading:boolean = true;
  private imageSubs!: Subscription;

  constructor(private articleService: ArticleService, private modalImageService: ModalImageService, private searchesService: SearchesService){

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
  
}
