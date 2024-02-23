import { Component, OnInit } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { Terminal, TerminalModule } from 'primeng/terminal';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public text = null;
  public response = 'Nothing yet';
  public duration: number = 0;
  iiUrl = "";
  constructor(private router: Router) {
  }
  ngOnInit(): void {
   
    this.add(Date.now().toString())
  }
  public async add(username: string = 'Angular') {
    // const start = Date.now();
    // console.log("start request")
    // this.response = await this.motokoService.add(username);
    // this.duration = Date.now() - start;
    // console.log("request time", this.duration)
  }
  public async get() {
    // this.response = await this.motokoService.getAll();
    // console.log("request time", this.response)
  }


  route() {
    this.router.navigateByUrl("dock");
  }
}
