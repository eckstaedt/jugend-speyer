import { version } from '../../../../package.json';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
const { Share } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public darkMode = false;
  public version: string = version;
  public theme: string = 'system';
  public isAdmin: boolean = false;

  constructor(
    private storage: Storage,
    private plt: Platform,
    private actionSheetController: ActionSheetController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.storage
      .get('darkMode')
      .then((res: boolean) => {
        this.darkMode = res;
      })
      .catch(() => {
        this.darkMode = false;
      });

    this.firebaseService.subscribeToAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  onThemeChange() {
    this.storage.set('theme', this.theme);
    if (this.theme === 'default') {
      const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
      var defaultTheme = prefersColor.matches;
      document.body.classList.toggle('dark', defaultTheme);
    } else if(this.theme === 'light') {
      document.body.classList.toggle('dark', false);
    } else if(this.theme === 'dark') {
      document.body.classList.toggle('dark', true);
    }
  }

  toggleMode() {
    this.storage.set('darkMode', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
  }

  async openContactActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'E-Mail',
        handler: () => this.openContactSource('mailto:entwickler@jugendkompass.de')
      }, {
        text: 'Telegram',
        handler: () => this.openContactSource('https://t.me/JugendKompass')
      }, {
        text: 'Whatsapp',
        handler: () => this.openContactSource('https://api.whatsapp.com/send?phone=4915737855537')
      }, {
        text: 'Abbrechen',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }

  openContactSource(url: string): void {
    window.open(url, '_blank');
  }

  async share() {
    if (this.plt.is('capacitor')) {
      await Share.share({
        title: 'Artikel teilen',
        text: 'Jugendkompass',
        url: this.plt.is('ios')
          ? 'https://apps.apple.com/us/app/stephanus-jugendkompass/id1529600025?ign-mpt=uo%3D2' // URL anpassen sobald im App Store
          : 'https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass&hl=gsw&gl=DE', // URL anpassen sobald im Play Store
        dialogTitle: 'App weiterempfehlen',
      });
    } else {
      await this.openShareActionSheet();
    }
  }

  async openShareActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'iOS App weiterempfehlen',
          icon: 'logo-apple',
          handler: () => {
            window.open(
              'https://apps.apple.com/us/app/stephanus-jugendkompass/id1529600025?ign-mpt=uo%3D2',
              '_blank',
            ); // URL anpassen sobald im App Store
          },
        },
        {
          text: 'Android App weiterempfehlen',
          icon: 'logo-android',
          handler: () => {
            window.open(
              'https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass&hl=gsw&gl=DE',
              '_blank',
            ); // URL anpassen sobald im Play Store
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
