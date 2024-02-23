import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { NodeService } from "src/service/nodeservice";
import { PhotoService } from "src/service/photoservice";
import { DappCookieService } from "../shared/services/cookie.service";
import { InternetIdentityService } from "src/service/internet-identity.service";
import { MotokoService } from "../motoko.service";
import { AuthClient } from "@dfinity/auth-client";

@Component({
    selector: "os",
    templateUrl: "./os.component.html",
    styleUrls: ["./os.component.scss"]
})
export class OSComponent implements OnInit {
    displayTerminal: boolean | undefined;
    menubarItems: any[] | undefined;

    responsiveOptions: any[] | undefined;

    // vars
    application = { name: "", visible: false };
    overlayVisible = false;
    connectWalletVisible = false;
    response = null;
    header = "";
    launchOverride = "";
    isAuthenticated = false;
    isMobile = false;
    public today = Date.now();

    constructor(
        private router: Router,
        private dappCookieService: DappCookieService,
        private motokoService: MotokoService,
        private internetIdentityService: InternetIdentityService,

    ) {
        router.events.subscribe((val) => {
            // see also
            if (val instanceof NavigationEnd) {

                if (val.url.includes("/application/")) {
                    this.application.name = val.url.split("/application/")[1];
                    this.route(this.application.name);

                }
            };
        });
    }

    checkMobile() {
        this.isMobile = window.innerWidth < 1200;
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.checkMobile();
    }

    async ngOnInit() {
        const authClient = await AuthClient.create();
        this.checkMobile();
        this.isAuthenticated = await authClient.isAuthenticated()
        this.overlayVisible = this.dappCookieService.applicationCache.viewLaunchOverlay;
        this.overlayVisible = this.dappCookieService.applicationCache.viewLaunchOverlay;
        setInterval(() => {
            this.today = Date.now();
        }, 100);
        this.getDefaultMenu();
        this.responsiveOptions = [
            {
                breakpoint: "1024px",
                numVisible: 3,
            },
            {
                breakpoint: "768px",
                numVisible: 2,
            },
            {
                breakpoint: "560px",
                numVisible: 1,
            },
        ];

        // this.subscription = this.terminalService.commandHandler.subscribe(
        //     (command) => this.commandHandler(command)
        // );


    }

    addButton() {
        this.add(Date.now().toString());
        this.get();
    }

    public async add(username: string = "Angular") {
        // const start = Date.now();
        // console.log("start request");
        // this.response = await this.motokoService.add(username);
        // console.log(this.response);
    }
    public async get() {
        // this.response = await this.motokoService.getAll();
        // console.log("get", this.response);
    }
    async connect() {
        this.internetIdentityService.callInternetIdentity();
    }
    logOut() {
        this.internetIdentityService.logOut();
    }
    route(route: string) {
        this.motokoService.logLogin();
        // this.motokoService.get("");
        this.application.visible = true;
        this.getMenu();
        this.router.navigateByUrl("application/" + route);

    }

    hide() {
        this.application.visible = false;
        this.getDefaultMenu();
        this.router.navigateByUrl("");
    }
    hideLaunchOverlay() {
        this.overlayVisible = false;
        this.dappCookieService.setApplicationCookies("viewLaunchOverlay", false);
    }

    getDefaultMenu() {

        this.menubarItems = [
            {
                label: "3RP",
            },
        ];

    }

    //todo clean this up and make it configurable, modular 
    getMenu() {
        this.menubarItems = [
            {
                label: "3RP",
            },
            {
                label: "File",
                items: [
                    {
                        label: "New",
                        icon: "pi pi-fw pi-plus",
                        items: [
                            {
                                label: "Bookmark",
                                icon: "pi pi-fw pi-bookmark",
                            },
                            {
                                label: "Video",
                                icon: "pi pi-fw pi-video",
                            },
                        ],
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-fw pi-trash",
                    },
                    {
                        separator: true,
                    },
                    {
                        label: "Export",
                        icon: "pi pi-fw pi-external-link",
                    },
                ],
            },
            // {
            //     label: 'Edit',
            //     items: [
            //         {
            //             label: 'Left',
            //             icon: 'pi pi-fw pi-align-left'
            //         },
            //         {
            //             label: 'Right',
            //             icon: 'pi pi-fw pi-align-right'
            //         },
            //         {
            //             label: 'Center',
            //             icon: 'pi pi-fw pi-align-center'
            //         },
            //         {
            //             label: 'Justify',
            //             icon: 'pi pi-fw pi-align-justify'
            //         }
            //     ]
            // },
            {
                label: "Users",
                items: [
                    {
                        label: "New",
                        icon: "pi pi-fw pi-user-plus",
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-fw pi-user-minus",
                    },
                    {
                        label: "Search",
                        icon: "pi pi-fw pi-users",
                        items: [
                            {
                                label: "Filter",
                                icon: "pi pi-fw pi-filter",
                                items: [
                                    {
                                        label: "Print",
                                        icon: "pi pi-fw pi-print",
                                    },
                                ],
                            },
                            {
                                icon: "pi pi-fw pi-bars",
                                label: "List",
                            },
                        ],
                    },
                ],
            },
        ];
        return;
    }
    ngOnDestroy() {
        // if (this.subscription) {
        //     this.subscription.unsubscribe();
        // }
    }
}
