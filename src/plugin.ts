import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import { Mod1 } from './types'

import 'nax-ccuilib/src/headers/nax/quick-menu-public-api.d.ts'

export default class JetpackWidget implements PluginClass {
    static dir: string
    static mod: Mod1

    constructor(mod: Mod1) {
        JetpackWidget.dir = mod.baseDirectory
        JetpackWidget.mod = mod
        JetpackWidget.mod.isCCL3 = mod.findAllAssets ? true : false
        JetpackWidget.mod.isCCModPacked = mod.baseDirectory.endsWith('.ccmod/')
    }

    async poststart() {
        /* jetpack */
        let jetpackOn = false
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
            pressEvent: () => {
                jetpackOn = !jetpackOn
            },
            keepPressed: true,
            image: () => ({
                gfx: new ig.Image('media/gui/jetpackWidget.png'),
                srcPos: { x: 0, y: 0 },
                pos: { x: 9, y: 8 },
                size: { x: 13, y: 14 },
            }),
        })
    }
}
