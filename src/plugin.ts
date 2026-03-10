import type {} from 'ultimate-crosscode-typedefs/crosscode-ccloader-all'
import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import type {} from 'nax-ccuilib/src/ui/quick-menu/quick-menu-extension'

declare global {
    namespace ig {
        var isJetpackOn: boolean
        var isKeyboardJetpackOn: boolean

        namespace Input {
            interface KnownActions {
                'keys-jump': true
            }
        }
    }
}

export default class JetpackWidget implements PluginClass {
    async prestart() {
        /* jetpack */

        ig.Game.inject({
            init() {
                this.parent()
                ig.isJetpackOn = nax.ccuilib.QuickRingMenuWidgets.isWidgetToggledOn('jetpack')
                ig.isKeyboardJetpackOn = !(sc.OPTIONS_DEFINITION['keys-jump'] /* CCJetpack */)
                if (ig.isKeyboardJetpackOn) ig.input.bind(ig.KEY.CTRL, 'keys-jump')
            },
        })

        ig.ENTITY.Player.inject({
            update() {
                this.parent()
                if (ig.isJetpackOn && (ig.gamepad.isButtonDown(ig.BUTTONS.FACE0 /* a */) || (ig.isKeyboardJetpackOn && ig.input.state('keys-jump')))) {
                    ig.game.playerEntity.doJump(150, 16, 250)
                }
            },
        })
        nax.ccuilib.QuickRingMenuWidgets.addWidget({
            name: 'jetpack',
            title: 'Toggle jetpack',
            description: 'Press CTRL or gamepad A to fly.',
            pressEvent: button => {
                ig.isJetpackOn = button.isToggleOn()
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
