import {getRandomNumbeArry} from './basicAlgorithm.js'
import {Mum, Charlotte} from '../data/messages.js'
import {familyMessagesdisplaying} from './message-animation.js'

export const liveMessagesControll = () => {
    const mumMsgNo = getRandomNumbeArry(1, 0, Mum.encouerage.length,)[0];
    const charleMsgindex = getRandomNumbeArry(1,0,Charlotte.normal.length)[0];
    familyMessagesdisplaying(Mum, "encouerage", mumMsgNo, ".dialog-mum-message", 1000);
    familyMessagesdisplaying(Charlotte,"normal",charleMsgindex,".dialog-message",5000)
}