import { Component, Input} from '@angular/core';

@Component({
    selector: 'app-welcome-script',
    template: `<p>
        {{welcomeScript}}
    </p>
    `
})

export class WelcomeScriptComponent  {
    @Input() welcomeScript: string;
}
