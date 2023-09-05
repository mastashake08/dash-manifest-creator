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
export class MPD {
  constructor (videoData = null) {
    this.doc = document.implementation.createDocument("", "", null)
    this.mpd = null
    this.video = videoData
  }

  createMpd (videoData = this.video, mediaUrl = '', startNumber = "1") {
    const date = new Date(Date.now()).toISOString()
    this.mpd = this.doc.createElement('MPD')
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

  }

  createPeriod (el) {
    const period = this.doc.createElement('Period')
    period.setAttribute('start', 'PT0S')
    period.setAttribute('id', "1")
    el.appendChild(period)
    return period
  }

  createAdaptationSet (el, mimetype = 'video/webm') {
    const as = this.doc.createElement('AdaptationSet')
    as.setAttribute('mimeType', mimetype)
    el.appendChild(as)
    return as
  }

  createContentComponent (el, contentType = 'video', id = "1") {
    const cc = this.doc.createElement('ContentComponent')
    cc.setAttribute('contentType', contentType)
    cc.setAttribute('id', id)
    el.appendChild(cc)
    return cc
  }

  createSegmentTemplate (el, timescale = "1000", duration = "2000", startNumber = "1", videoData = this.video, media = '') {
    const st = this.doc.createElement('SegmentTemplate')
    st.setAttribute('timescale', timescale)
    st.setAttribute('duration', duration)
    st.setAttribute('startNumber', startNumber)
    st.setAttribute('initialization', "data:video/mp4;base64,"+btoa(videoData))
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
    const str = xml.serializeToString(this.mpd)
    const file = new Blob([str], {
      type: "text/xml",
    })
    return file
  }
}
