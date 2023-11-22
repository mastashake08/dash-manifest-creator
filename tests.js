import { MPD } from './classes/MPD'

const m = new MPD()
const mpd = m.createMpd()
mpd.next()
console.log(m.getXMLString())
mpd.next()
console.log(m.getXMLString())
mpd.next()
console.log(m.getXMLString())
console.log(m.getXMLFile())