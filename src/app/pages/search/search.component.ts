import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Company } from 'src/app/models/company.mode';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public usersArr: User[] = [];
  public companies: Company[] = [];
  public articles: Article[] = [];
  public loading : boolean = true;
  constructor(private activateRoute : ActivatedRoute, private searchService : SearchesService){

  }
  ngOnInit(): void {
    this.loading = true;
    this.activateRoute.params.subscribe( ({term}) => {
      this.globalSearch(term)
      this.loading = false;
    })
  }
  
  globalSearch(term: string){
    this.searchService.globalSearch(term)
        .subscribe( (resp:any) => {
          
          this.usersArr = resp.users;
          // if(this.users.length)
          this.companies = resp.companies;
          this.articles = resp.articles;
        });
  }


}
