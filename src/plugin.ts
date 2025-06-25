import type {} from 'ultimate-crosscode-typedefs/crosscode-ccloader-all'
import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import type {} from 'nax-ccuilib/src/ui/quick-menu/quick-menu-extension'

export default class JetpackWidget implements PluginClass {
    async poststart() {
        /* jetpack */
        let jetpackOn = nax.ccuilib.QuickRingMenuWidgets.isWidgetToggledOn('jetpack')

        const keyboardJetpackOn = !(sc.OPTIONS_DEFINITION['keys-jump'] /* CCJetpack */)
        if (keyboardJetpackOn) ig.input.bind(ig.KEY.CTRL, 'keys-jump')
        ig.ENTITY.Player.inject({
            update() {
                this.parent()
                if (jetpackOn && (ig.gamepad.isButtonDown(ig.BUTTONS.FACE0 /* a */) || (keyboardJetpackOn && ig.input.state('keys-jump'))))
                    ig.game.playerEntity.doJump(150, 16, 250)
            },
        })
        nax.ccuilib.QuickRingMenuWidgets.addWidget({
            name: 'jetpack',
            title: 'Toggle jetpack',
            description: 'Press CTRL or gamepad A to fly.',
            pressEvent: button => {
                jetpackOn = button.isToggleOn()
            },
            toggle: true,
            image: () => ({
                gfx: new ig.Image('media/gui/jetpackWidget.png'),
                srcPos: { x: 0, y: 0 },
                pos: { x: 9, y: 8 },
                size: { x: 13, y: 14 },
            }),
        })
    }
}
