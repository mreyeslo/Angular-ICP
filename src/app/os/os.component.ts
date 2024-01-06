import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { NodeService } from 'src/service/nodeservice';
import { PhotoService } from 'src/service/photoservice';
import { MotokoService } from '../motoko.service';

@Component({
    selector: 'os',
    templateUrl: './os.component.html',
    styleUrls: ['./os.component.scss'],
    providers: [MessageService, TerminalService]
})
export class OSComponent implements OnInit {
    displayTerminal: boolean | undefined;

    displayFinder: boolean | undefined;

    displayGalleria: boolean | undefined;

    dockItems: MenuItem[] | undefined;

    menubarItems: any[] | undefined;

    responsiveOptions: any[] | undefined;

    images: any[] | undefined;

    nodes: any[] | undefined;

    subscription: Subscription | undefined;
    visible = false;
    response = null;
    public today = Date.now();

    constructor(private galleriaService: PhotoService, private nodeService: NodeService,
        private router: Router, private messageService: MessageService, private terminalService: TerminalService,
        private motokoService: MotokoService) {
    }
    addButton() {
        this.add(Date.now().toString());
        this.get();
    }
    public async add(username: string = 'Angular') {
        const start = Date.now();
        console.log("start request")
        this.response = await this.motokoService.add(username);
        console.log(this.response)

    }
    public async get() {
        this.response = await this.motokoService.getAll();
        console.log("get", this.response)
    }
    ngOnInit() {

        setInterval(() => {
            this.today = Date.now();
        }, 100);
        this.menubarItems = [
            {
                label: '3RP'
            }];

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.subscription = this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));

        this.galleriaService.getImages().then((data) => (this.images = data));
        this.nodeService.getFiles().then((data) => (this.nodes = data));
    }

    route(route: string) {
        this.visible = true;
        this.getMenu();
        this.router.navigateByUrl(route);
    }
    hide() {
        this.visible = false;
        this.menubarItems = [
            {
                label: '3RP'
            }];
    }
    commandHandler(text: any) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            this.terminalService.sendResponse(response as string);
        }
    }

    getMenu() {
        this.menubarItems = [
            {
                label: '3RP'
            },
            {
                label: 'File',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
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
                label: 'Users',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },

        ];
        return
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}