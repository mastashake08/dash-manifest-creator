/*
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns="urn:mpeg:dash:schema:mpd:2011"
     xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd"
     type="dynamic"
     profiles="urn:mpeg:dash:profile:isoff-live:2011"
     minimumUpdatePeriod="PT60S"
     minBufferTime="PT12S"
     availabilityStartTime="2016-04-13T20:52:58" >
  <Period start="PT0S" id="1">
    <AdaptationSet mimeType="video/webm">
      <ContentComponent contentType="video" id="1"/>
      <SegmentTemplate timescale="1000"
           duration="2000"
           startNumber="1"
           initialization="data:video/mp4;base64,AAAAGGZ0eXBpc...AAA"
           media="/dash_upload?cid=xxxx-xxxx-xxxx-xxxx&copy=0&file=media-$Number%09d$.webm"/>
    </AdaptationSet>
  </Period>
</MPD>
*/
import { saveAs } from 'file-saver'
class MPD {
  constructor (videoData = null, doc) {
    this.video = videoData
    this.doc = doc
    this.mpd = doc.createElement('MPD')
  }

  *createMpd (videoData = this.video, mediaUrl = '', startNumber = 1) {
    while(true) {
      const date = new Date(Date.now()).toISOString()
      this.mpd.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
      this.mpd.setAttribute('xmlns', 'urn:mpeg:dash:schema:mpd:2011')
      this.mpd.setAttribute('xsi:schemaLocation', 'urn:mpeg:dash:schema:mpd:2011 DASH-MPD.xsd')
      this.mpd.setAttribute('type', 'dynamic')
      this.mpd.setAttribute('profiles', 'urn:mpeg:dash:profile:isoff-live:2011')
      this.mpd.setAttribute('minimumUpdatePeriod', 'PT60S')
      this.mpd.setAttribute('minBufferTime', 'PT12S')
      this.mpd.setAttribute('availabilityStartTime', date)
      const period = this.createPeriod(this.mpd)
      const as = this.createAdaptationSet(period)
      const cc = this.createContentComponent(as)
      const st = this.createSegmentTemplate(as, "1000", "2000", startNumber, videoData, mediaUrl)
      console.log(period.next().value)
      console.log(as.next().value)
      console.log(cc.next().value)
      console.log(st.next().value)
      yield this.doc
    }
  }

  /**
   * 
   * @param {*} el - element that will be appended to
   * @param {*} timeOffset - time offset for start time
   */
  *createPeriod (el, timeOffset) {
    let id = 1;
    let time = 0;
    const period = this.doc.createElement('Period')
    while (true) {
      if (time == 0) {
        period.setAttribute('start', `PT${time}S`)
      } else {
        period.setAttribute('start', `PT${time + timeOffset}S`)
      }
      period.setAttribute('id', id)
      yield el.appendChild(period)
      id++;
    }
  }

  *createAdaptationSet (el, mimetype = 'video/webm') {
    while(true) {
    const as = this.doc.createElement('AdaptationSet')
    as.setAttribute('mimeType', mimetype)
    yield el.appendChild(as)
    }
   
  }

  *createContentComponent (el, contentType = 'video') {
    let id = 1;
    while(true) {
      const cc = this.doc.createElement('ContentComponent');
      cc.setAttribute('contentType', contentType);
      cc.setAttribute('id', id);
      yield el.appendChild(cc);
      id++;
    }
  }

  *createSegmentTemplate (el, timescale = "1000", duration = "2000", startNumber = "1", videoData = this.video, media = '') {
    const st = this.doc.createElement('SegmentTemplate')
    st.setAttribute('startNumber', startNumber)
    st.setAttribute('initialization', "data:video/webm;base64,"+btoa(yield videoData))
    st.setAttribute('media', media)
    el.appendChild(st)
    return st
  }

  downloadXML () {
    const blob = this.getBlob()
    saveAs(blob, 'dash.mpd')
  }

  getBlob () {
    const xml = new XMLSerializer()
    let str = xml.serializeToString(this.mpd)
    const file = new Blob(['<?xml version="1.0" encoding="UTF-8"?>'+str], {
      type: "application/xml",
    })
    console.log(file)
    return file
  }
}
export {
  MPD
}
